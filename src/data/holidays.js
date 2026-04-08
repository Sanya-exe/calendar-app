export const indianHolidays = [
  { month: 0, day: 1, name: "New Year", type: "federal" },
  { month: 0, day: 14, name: "Makar Sankranti", type: "festival" },
  { month: 0, day: 26, name: "Republic Day", type: "federal" },
  { month: 1, day: 14, name: "Valentine's Day", type: "observance" },
  { month: 2, day: 8, name: "Mahashivratri", type: "festival" },
  { month: 2, day: 14, name: "Holi", type: "festival" },
  { month: 2, day: 29, name: "Ramzan/Eid-ul-Fitr", type: "festival" },
  { month: 3, day: 14, name: "Ambedkar Jayanti", type: "observance" },
  { month: 4, day: 1, name: "May Day", type: "observance" },
  { month: 4, day: 12, name: "Eid-ul-Adha", type: "festival" },
  { month: 5, day: 15, name: "Rath Yatra", type: "festival" },
  { month: 6, day: 17, name: "Bakri Eid", type: "festival" },
  { month: 7, day: 15, name: "Independence Day", type: "federal" },
  { month: 7, day: 19, name: "Raksha Bandhan", type: "festival" },
  { month: 8, day: 7, name: "Janmashtami", type: "festival" },
  { month: 8, day: 16, name: "Ganesh Chaturthi", type: "festival" },
  { month: 9, day: 2, name: "Mahatma Gandhi Jayanti", type: "federal" },
  { month: 9, day: 12, name: "Dussehra", type: "festival" },
  { month: 10, day: 1, name: "Durga Puja", type: "festival" },
  { month: 10, day: 14, name: "Diwali", type: "festival" },
  { month: 10, day: 15, name: "Bhai Dooj", type: "festival" },
  { month: 11, day: 25, name: "Christmas", type: "festival" },
  { month: 11, day: 31, name: "New Year's Eve", type: "observance" },
];

const getGoodFriday = (year) => {
  // Meeus/Jones/Butcher Gregorian algorithm for Easter Sunday
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const easterMonth = Math.floor((h + l - 7 * m + 114) / 31); // 3=March, 4=April
  const easterDay = ((h + l - 7 * m + 114) % 31) + 1;

  const easterDate = new Date(year, easterMonth - 1, easterDay);
  const goodFridayDate = new Date(easterDate);
  goodFridayDate.setDate(easterDate.getDate() - 2);

  return {
    month: goodFridayDate.getMonth(),
    day: goodFridayDate.getDate(),
    name: "Good Friday",
    type: "religious",
  };
};

export const getHolidayForDate = (date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const dynamicHolidays = [getGoodFriday(year)];
  const allHolidays = [...indianHolidays, ...dynamicHolidays];
  return allHolidays.find((h) => h.month === month && h.day === day);
};

export const getMonthHolidays = (year, month) => {
  const dynamicHolidays = [getGoodFriday(year)];
  const allHolidays = [...indianHolidays, ...dynamicHolidays];
  return allHolidays.filter((h) => h.month === month);
};
