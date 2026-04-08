import { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  isAfter,
  startOfDay,
} from "date-fns";

export const useCalendar = (initialDate = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [allowPastDates, setAllowPastDates] = useState(true);

  const currentMonth = useMemo(
    () => startOfMonth(currentDate),
    [currentDate]
  );
  const currentMonthEnd = useMemo(
    () => endOfMonth(currentDate),
    [currentDate]
  );

  const calendarStart = useMemo(
    () => startOfWeek(currentMonth, { weekStartsOn: 0 }),
    [currentMonth]
  );
  const calendarEnd = useMemo(
    () => endOfWeek(currentMonthEnd, { weekStartsOn: 0 }),
    [currentMonthEnd]
  );

  const days = useMemo(() => {
    const daysArray = [];
    let day = calendarStart;
    while (day <= calendarEnd) {
      daysArray.push(day);
      day = addDays(day, 1);
    }
    return daysArray;
  }, [calendarStart, calendarEnd]);

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToPrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  const isDateDisabled = (date) => {
    const today = startOfDay(new Date());
    return !allowPastDates && isBefore(date, today);
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else if (isBefore(date, selectedStart)) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      setSelectedEnd(date);
    }
  };

  const clearSelection = () => {
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  const isDateInRange = (date) => {
    if (!selectedStart || !selectedEnd) return false;
    return (
      (isAfter(date, selectedStart) || isSameDay(date, selectedStart)) &&
      (isBefore(date, selectedEnd) || isSameDay(date, selectedEnd))
    );
  };

  const isStartDate = (date) => {
    return selectedStart && isSameDay(date, selectedStart);
  };

  const isEndDate = (date) => {
    return selectedEnd && isSameDay(date, selectedEnd);
  };

  const getSelectedRangeLabel = () => {
    if (!selectedStart) return "";
    if (!selectedEnd) return format(selectedStart, "MMM d, yyyy");
    return `${format(selectedStart, "MMM d")} - ${format(selectedEnd, "MMM d, yyyy")}`;
  };

  return {
    currentDate,
    currentMonth,
    days,
    selectedStart,
    selectedEnd,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
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
    format,
  };
};