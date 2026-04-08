import { motion } from "framer-motion";
import { format } from "date-fns";

const DayCell = ({
  date,
  isCurrentMonth,
  isStart,
  isEnd,
  isInRange,
  isTodayDate,
  hasNote,
  onClick,
  theme,
  disabled,
  getHolidayForDate,
}) => {
  const holiday = getHolidayForDate(date);
  
  const baseClasses = `
    calendar-day cursor-pointer flex flex-col items-center justify-center
    transition-all duration-200 select-none
  `;

  const getCellStyles = () => {
    const styles = {
      backgroundColor: theme.bg,
      color: theme.text,
      border: `1px solid ${theme.border}`,
    };

    if (disabled) {
      return {
        ...styles,
        color: theme.text + "40",
        cursor: "not-allowed",
        opacity: 0.5,
      };
    }

    if (isStart || isEnd) {
      styles.backgroundColor = theme.primary;
      styles.color = "white";
      styles.borderColor = theme.primary;
      styles.fontWeight = "600";
    } else if (isInRange) {
      styles.backgroundColor = theme.rangeBg;
      styles.borderColor = theme.border;
    } else if (!isCurrentMonth) {
      styles.color = theme.text + "40";
    }

    if (isTodayDate && isCurrentMonth) {
      styles.borderColor = theme.primaryDark;
      styles.borderWidth = "2px";
    }

    return styles;
  };

  const handleClick = () => {
    if (!disabled && !isCurrentMonth) return;
    onClick(date);
  };

  const ariaLabelParts = [format(date, "EEEE, MMMM d, yyyy")];
  if (holiday && isCurrentMonth) ariaLabelParts.push(`${holiday.name} holiday`);
  if (isStart) ariaLabelParts.push("range start");
  if (isEnd) ariaLabelParts.push("range end");
  if (isInRange && !isStart && !isEnd) ariaLabelParts.push("within selected range");

  return (
    <motion.button
      type="button"
      whileHover={!disabled && isCurrentMonth ? { scale: 1.1 } : {}}
      whileTap={!disabled && isCurrentMonth ? { scale: 0.95 } : {}}
      onClick={handleClick}
      className={baseClasses}
      style={getCellStyles()}
      disabled={disabled || !isCurrentMonth}
      aria-label={ariaLabelParts.join(", ")}
      aria-selected={isStart || isEnd || isInRange}
      title={holiday && isCurrentMonth ? holiday.name : ""}
    >
      <span className="text-xs sm:text-sm md:text-base">
        {date.getDate()}
      </span>
      <div className="flex items-center gap-0.5 mt-0.5">
        {holiday && isCurrentMonth && (
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: theme.primary }}
          />
        )}
        {hasNote && isCurrentMonth && (
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: theme.textSecondary }}
          />
        )}
      </div>
    </motion.button>
  );
};

export const CalendarGrid = ({
  days,
  currentMonth,
  selectedStart,
  selectedEnd,
  handleDateClick,
  isSameMonth,
  isToday,
  isDateInRange,
  isStartDate,
  isEndDate,
  hasNoteForDate,
  isDateDisabled,
  getHolidayForDate,
  theme,
}) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div
        className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-2"
        style={{ color: theme.textSecondary }}
      >
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-[11px] sm:text-xs md:text-sm font-medium py-1.5 sm:py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2">
        {days.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isStart = isStartDate(date);
          const isEnd = isEndDate(date);
          const isInRange = isDateInRange(date);
          const isTodayDate = isToday(date);
          const hasNote = hasNoteForDate(date);

          if (!isCurrentMonth) {
            return (
              <div key={date.toISOString()} className="calendar-day opacity-0 pointer-events-none" aria-hidden="true" />
            );
          }

          return (
            <motion.div
              key={date.toISOString()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.01,
                duration: 0.2,
              }}
            >
              <DayCell
                date={date}
                isCurrentMonth={isCurrentMonth}
                isStart={isStart}
                isEnd={isEnd}
                isInRange={isInRange}
                isTodayDate={isTodayDate}
                hasNote={hasNote}
                onClick={handleDateClick}
                theme={theme}
                disabled={isDateDisabled(date)}
                getHolidayForDate={getHolidayForDate}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};