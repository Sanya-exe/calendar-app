# Interactive Wall Calendar (Frontend Engineering Challenge)

A polished, responsive wall-calendar-inspired React component with:
- Seasonal hero imagery
- Date range selection (start/end/in-between states)
- Integrated notes panel (monthly + specific date)
- Local storage persistence
- Holiday indicators

This project is frontend-only and does not require a backend.

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion (micro animations)
- date-fns (calendar/date utilities)
- localStorage (client-side persistence)

## Features

### Core requirements
- **Wall calendar aesthetic**: Hero image plus monthly date grid in a single visual card.
- **Day range selector**: Select start and end date with clear visual range states.
- **Integrated notes section**:
  - Monthly notes
  - Per-date notes (based on selected date)
- **Fully responsive**:
  - Desktop: segmented side-by-side layout (calendar + notes)
  - Mobile: stacked layout with touch-friendly controls

### Additional enhancements
- Seasonal theming (spring/summer/autumn/winter)
- Holiday markers on dates
- Animated month transitions
- Optional toggle to allow/disallow selecting past dates
- Keyboard-accessible day cells with ARIA labels

## Project Structure

`src/components`
- `Calendar.jsx` - top-level calendar page layout and composition
- `CalendarHeader.jsx` - month navigation and "Today" action
- `CalendarGrid.jsx` - date grid rendering and date cell interactions
- `HeroImage.jsx` - seasonal hero image section
- `NotesPanel.jsx` - monthly/date note editing and save actions

`src/hooks`
- `useCalendar.js` - month navigation, range selection, date-state utilities
- `useNotes.js` - localStorage-backed note persistence and lookup

`src/utils`
- `themes.js` - seasonal color and image mapping

`src/data`
- `holidays.js` - static holiday marker list

## Key Implementation Choices

- **State isolation**:
  - Calendar interaction logic is centralized in `useCalendar`.
  - Notes persistence logic is centralized in `useNotes`.
- **Persistence**:
  - Notes are saved in browser `localStorage` under a single namespaced key.
- **Accessibility**:
  - Date cells are semantic buttons with keyboard operability and ARIA labels.
- **Responsiveness**:
  - Utility-first responsive classes are used to keep behavior explicit and predictable.

## Run Locally

```bash
npm install
npm run dev
```

Open the app at the URL shown in terminal (usually `http://localhost:5173`).

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Submission Checklist

- [ ] Public repository link
- [ ] Short demo video showing:
  - date range selection
  - notes usage (monthly + date)
  - responsive behavior (desktop + mobile)
- [ ] Optional deployed demo link (Vercel/Netlify)

## Notes / Trade-offs

- Holiday data is static mock data for challenge scope.
- Notes are client-only and browser-local by design.
- No backend/API was added intentionally, per assignment scope.
