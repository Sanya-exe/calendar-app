import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, Calendar, Trash2, FileText } from "lucide-react";

export const NotesPanel = ({
  theme,
  currentDate,
  selectedStart,
  getMonthlyNote,
  saveMonthlyNote,
  getDateNote,
  saveDateNote,
  clearSelection,
  getSelectedRangeLabel,
}) => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [monthlyNote, setMonthlyNote] = useState("");
  const [dateNote, setDateNote] = useState("");
  const [saved, setSaved] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const effectiveDate = selectedStart || currentDate;

  const handleMonthlyNoteChange = (e) => {
    setMonthlyNote(e.target.value);
    setSaved(false);
  };

  const handleDateNoteChange = (e) => {
    setDateNote(e.target.value);
    setSaved(false);
  };

  const handleSaveMonthly = () => {
    saveMonthlyNote(year, month, monthlyNote);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveDate = () => {
    saveDateNote(effectiveDate, dateNote);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  useEffect(() => {
    if (activeTab === "monthly") {
      setMonthlyNote(getMonthlyNote(year, month));
    }
  }, [activeTab, year, month]);

  useEffect(() => {
    if (activeTab !== "date") return;
    setDateNote(getDateNote(effectiveDate));
  }, [activeTab, selectedStart]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl p-3 sm:p-4 md:p-6 h-full min-h-[42vh] sm:min-h-[48vh] md:min-h-[52vh] lg:min-h-0 flex flex-col shadow-sm"
      style={{
        backgroundColor: theme.bg,
        border: `1px solid ${theme.border}`,
        boxShadow: `0 12px 30px -22px ${theme.primary}80`,
      }}
    >
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <StickyNote size={20} style={{ color: theme.primary }} />
        <h3 className="text-base sm:text-lg font-semibold" style={{ color: theme.text }}>
          Notes
        </h3>
      </div>

      <div
        className="grid grid-cols-2 gap-1 sm:gap-2 mb-3 sm:mb-4 p-1 rounded-lg sm:rounded-xl"
        style={{ backgroundColor: theme.bgLight, border: `1px solid ${theme.border}` }}
      >
        <button
          onClick={() => {
            setActiveTab("monthly");
          }}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all"
          style={{
            backgroundColor: activeTab === "monthly" ? theme.primary : "transparent",
            color: activeTab === "monthly" ? "white" : theme.textSecondary,
          }}
        >
          <Calendar size={13} />
          Monthly
        </button>
        <button
          onClick={() => {
            setActiveTab("date");
          }}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all"
          style={{
            backgroundColor: activeTab === "date" ? theme.primary : "transparent",
            color: activeTab === "date" ? "white" : theme.textSecondary,
          }}
        >
          <FileText size={13} />
          Date
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "monthly" ? (
          <motion.div
            key="monthly"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-2 sm:mb-3">
              <p className="text-xs sm:text-sm font-medium" style={{ color: theme.textSecondary }}>
                Notes for {currentDate.toLocaleString("default", { month: "long" })} {year}
              </p>
            </div>
            <textarea
              value={monthlyNote}
              onChange={handleMonthlyNoteChange}
              placeholder="Add monthly notes, reminders, or goals..."
              className="flex-1 w-full p-2.5 sm:p-3 md:p-4 resize-none text-xs sm:text-sm leading-5 sm:leading-6 mb-2 border-0 ring-0 focus:outline-none focus:ring-0 focus:border-0"
              style={{
                backgroundColor: "transparent",
                border: "0",
                color: theme.text,
                outline: "none",
                boxShadow: "none",
                appearance: "none",
                WebkitAppearance: "none",
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="date"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-2 sm:mb-3">
              <p className="text-xs sm:text-sm font-medium" style={{ color: theme.textSecondary }}>
                {selectedStart
                  ? `Notes for ${selectedStart.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}`
                  : `No date selected, writing note for today (${currentDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })})`}
              </p>
            </div>
            <textarea
              value={dateNote}
              onChange={handleDateNoteChange}
              placeholder="Add notes for this date..."
              className="flex-1 w-full p-2.5 sm:p-3 md:p-4 resize-none text-xs sm:text-sm leading-5 sm:leading-6 mb-2 border-0 ring-0 focus:outline-none focus:ring-0 focus:border-0"
              style={{
                backgroundColor: "transparent",
                border: "0",
                color: theme.text,
                outline: "none",
                boxShadow: "none",
                appearance: "none",
                WebkitAppearance: "none",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-2 pt-1 pb-1 sm:pb-3 gap-2">
        <div className="flex items-center gap-2">
          {selectedStart && activeTab === "date" && (
            <span
              className="text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium"
              style={{ backgroundColor: theme.bgLight, color: theme.textSecondary, border: `1px solid ${theme.border}` }}
            >
              {getSelectedRangeLabel()}
            </span>
          )}
        </div>
        
        <div className="flex gap-1.5 sm:gap-2">
          {selectedStart && activeTab === "date" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearSelection}
              className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl"
              style={{ backgroundColor: theme.bgLight, color: theme.textSecondary, border: `1px solid ${theme.border}` }}
              title="Clear selection"
            >
              <Trash2 size={16} />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={activeTab === "monthly" ? handleSaveMonthly : handleSaveDate}
            className="flex items-center justify-center min-w-[92px] sm:min-w-[118px] md:min-w-[132px] px-4 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all shadow-md mb-0.5 sm:mb-1"
            style={{
              backgroundColor: theme.primary,
              color: "white",
              border: `1px solid ${theme.primaryDark}`,
              boxShadow: `0 8px 18px -10px ${theme.primaryDark}`,
            }}
          >
            {saved ? "Saved!" : "Save"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};