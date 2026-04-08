import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { getThemeForMonth } from "../utils/themes";
import { useCalendar } from "../hooks/useCalendar";
import { useNotes } from "../hooks/useNotes";
import { getHolidayForDate as getFallbackHolidayForDate } from "../data/holidays";
import { HeroImage } from "./HeroImage";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";

export const Calendar = () => {
  const {
    currentDate,
    currentMonth,
    days,
    selectedStart,
    selectedEnd,
    goToNextMonth,
    goToPrevMonth,
    handleDateClick,
    clearSelection,
    isDateInRange,
    isStartDate,
    isEndDate,
    isSameMonth,
    isToday,
    allowPastDates,
    setAllowPastDates,
    isDateDisabled,
    getSelectedRangeLabel,
  } = useCalendar();

  const {
    getMonthlyNote,
    saveMonthlyNote,
    getDateNote,
    saveDateNote,
    hasNoteForDate,
  } = useNotes();

  const theme = useMemo(() => getThemeForMonth(currentDate.getMonth()), [currentDate]);
  const [apiHolidaysByDate, setApiHolidaysByDate] = useState({});

  useEffect(() => {
    const year = currentDate.getFullYear();
    let ignore = false;

    const fetchHolidays = async () => {
      try {
        const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/IN`);
        if (!res.ok) throw new Error("Holiday API request failed");

        const data = await res.json();
        const byDate = {};

        for (const item of data) {
          if (!item?.date) continue;
          byDate[item.date] = {
            name: item.localName || item.name,
            type: "public",
          };
        }

        if (!ignore) setApiHolidaysByDate(byDate);
      } catch (error) {
        if (!ignore) setApiHolidaysByDate({});
        console.error("Holiday API unavailable, using fallback holidays:", error);
      }
    };

    fetchHolidays();

    return () => {
      ignore = true;
    };
  }, [currentDate]);

  const getHolidayForDate = useCallback(
    (date) => {
      const key = format(date, "yyyy-MM-dd");
      return apiHolidaysByDate[key] || getFallbackHolidayForDate(date);
    },
    [apiHolidaysByDate]
  );

  return (
    <div
      className="min-h-screen w-full flex justify-center items-start overflow-y-auto px-3 pt-4 pb-4 sm:px-4 sm:pt-6 sm:pb-6 md:px-10 md:pt-10 md:pb-8 lg:px-16 lg:pt-14 lg:pb-12"
      style={{ backgroundColor: theme.bg }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl shadow-lg border"
              style={{
                backgroundColor: theme.bg,
                borderColor: theme.border,
                boxShadow: `0 10px 40px -10px ${theme.primary}30`,
              }}
            >
              <HeroImage theme={theme} />

              <CalendarHeader
                currentDate={currentDate}
                onPrevMonth={goToPrevMonth}
                onNextMonth={goToNextMonth}
                theme={theme}
              />

              <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-3 pt-1">
                <label className="inline-flex items-center gap-2 text-xs sm:text-sm cursor-pointer" style={{ color: theme.textSecondary }}>
                  <input
                    type="checkbox"
                    checked={allowPastDates}
                    onChange={(e) => setAllowPastDates(e.target.checked)}
                    className="accent-current"
                  />
                  Allow selecting past dates
                </label>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDate.toISOString()}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CalendarGrid
                    days={days}
                    currentMonth={currentMonth}
                    selectedStart={selectedStart}
                    selectedEnd={selectedEnd}
                    handleDateClick={handleDateClick}
                    isSameMonth={isSameMonth}
                    isToday={isToday}
                    isDateInRange={isDateInRange}
                    isStartDate={isStartDate}
                    isEndDate={isEndDate}
                    hasNoteForDate={hasNoteForDate}
                    isDateDisabled={isDateDisabled}
                    getHolidayForDate={getHolidayForDate}
                    theme={theme}
                  />
                </motion.div>
              </AnimatePresence>

              {selectedStart && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-3 sm:px-4 md:px-6 lg:px-8 pb-5 sm:pb-6 md:pb-8 pt-3"
                >
                  <div
                    className="flex items-center justify-between gap-2 p-3 sm:p-4 rounded-lg mb-1"
                    style={{ backgroundColor: theme.rangeBg }}
                  >
                    <span className="text-xs sm:text-sm font-medium" style={{ color: theme.text }}>
                      Selected Range:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-right" style={{ color: theme.primary }}>
                      {getSelectedRangeLabel()}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-2 flex">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full w-full border rounded-2xl"
              style={{ borderColor: theme.border }}
            >
              <NotesPanel
                theme={theme}
                currentDate={currentDate}
                selectedStart={selectedStart}
                selectedEnd={selectedEnd}
                getMonthlyNote={getMonthlyNote}
                saveMonthlyNote={saveMonthlyNote}
                getDateNote={getDateNote}
                saveDateNote={saveDateNote}
                clearSelection={clearSelection}
                getSelectedRangeLabel={getSelectedRangeLabel}
              />
            </motion.div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};