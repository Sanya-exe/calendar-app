import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CalendarHeader = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  theme,
}) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex items-center justify-between gap-2 sm:gap-4 px-3 py-3 sm:p-4"
      style={{ color: theme.text }}
    >
      <div className="flex items-center justify-between w-full">
        <button
          onClick={onPrevMonth}
          className="p-1.5 sm:p-2 rounded-full hover:bg-opacity-20 hover:bg-black transition-all duration-200"
          style={{ backgroundColor: theme.bgLight }}
          aria-label="Previous month"
        >
          <ChevronLeft size={18} style={{ color: theme.primary }} />
        </button>
        
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold min-w-[150px] sm:min-w-[180px] text-center">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button
          onClick={onNextMonth}
          className="p-1.5 sm:p-2 rounded-full hover:bg-opacity-20 hover:bg-black transition-all duration-200"
          style={{ backgroundColor: theme.bgLight }}
          aria-label="Next month"
        >
          <ChevronRight size={18} style={{ color: theme.primary }} />
        </button>
      </div>

    </motion.div>
  );
};