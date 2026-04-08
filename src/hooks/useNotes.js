import { useState, useEffect } from "react";
import { format } from "date-fns";

const STORAGE_KEY = "calendar-notes";

const getStorageData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { monthly: {}, dates: {} };
  } catch {
    return { monthly: {}, dates: {} };
  }
};

export const useNotes = () => {
  const [notes, setNotes] = useState(getStorageData);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes:", error);
    }
  }, [notes]);

  const saveMonthlyNote = (year, month, note) => {
    const key = `${year}-${month}`;
    setNotes((prev) => ({
      ...prev,
      monthly: {
        ...prev.monthly,
        [key]: note,
      },
    }));
  };

  const getMonthlyNote = (year, month) => {
    const key = `${year}-${month}`;
    return notes.monthly[key] || "";
  };

  const saveDateNote = (date, note) => {
    const key = format(date, "yyyy-MM-dd");
    setNotes((prev) => ({
      ...prev,
      dates: {
        ...prev.dates,
        [key]: note,
      },
    }));
  };

  const getDateNote = (date) => {
    const key = format(date, "yyyy-MM-dd");
    return notes.dates[key] || "";
  };

  const hasNoteForDate = (date) => {
    const key = format(date, "yyyy-MM-dd");
    return !!notes.dates[key];
  };

  const clearAllNotes = () => {
    setNotes({ monthly: {}, dates: {} });
  };

  return {
    saveMonthlyNote,
    getMonthlyNote,
    saveDateNote,
    getDateNote,
    hasNoteForDate,
    clearAllNotes,
  };
};