# Interactive Wall Calendar Component

A polished, fully responsive React calendar component with an elegant wall calendar aesthetic, featuring date range selection, integrated notes functionality, and multiple theme options.

## 🎯 Features

### Core Requirements
- **Wall Calendar Aesthetic**: A clean, modern design inspired by physical wall calendars with a prominent hero image at the top and date grid below
- **Date Range Selector**: Select start and end dates with visual indicators for the selected range and days in between
- **Integrated Notes Section**: Add detailed notes to specific dates with a persistent storage system
- **Fully Responsive Design**: Desktop, tablet, and mobile-optimized layouts with seamless transitions

### Extra Features (Creative Additions)
- **Multi-Theme Support**: Switch between 4 beautiful color themes (Blue, Coral, Emerald, Purple) with smooth animations
- **Persistent Date Notes**: Save individual notes for specific dates with visual indicators
- **Month Navigation**: Easy month navigation with previous/next buttons
- **Visual States**: Clear visual distinction between:
  - Start and end dates (highlighted in primary color)
  - Dates in the selected range (light background)
  - Dates with notes (note indicator emoji)
- **Smooth Animations**: Hover effects, transitions, and micro-interactions for enhanced UX
- **Sticky Hero Image**: On desktop, the hero image stays in view while scrolling (sticky positioning)
- **Print-Friendly**: Optimized print styles for printing the calendar

## 📦 Project Structure

```
calendar/
├── src/
│   ├── components/
│   │   └── Calendar.jsx          # Main calendar component with all functionality
│   ├── styles/
│   │   └── Calendar.css          # Comprehensive calendar styling
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # Global app styles
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Base styles
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The calendar will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design & Architecture

### Component Structure

The `Calendar` component is self-contained and includes:

**State Management:**
- `currentDate`: Tracks the current month being viewed
- `startDate` / `endDate`: Stores the selected date range
- `notes`: Current note being typed
- `dateNotes`: Object map of dates to their associated notes
- `selectedDateForNote`: Currently selected date for note entry
- `heroImage`: URL for the hero image
- `theme`: Current active theme

**Key Methods:**
- `handleDateClick()`: Manages date selection logic
- `handleClearDates()`: Resets date selection
- `handleSaveNote()`: Persists notes to state
- `handlePreviousMonth()` / `handleNextMonth()`: Month navigation
- `handleThemeChange()`: Updates the active theme

**Helper Functions:**
- `isDateInRange()`: Determines if a date is within the selected range
- `isStartDate()` / `isEndDate()`: Checks date boundaries

### Styling Approach

The component uses:
- **CSS Variables** for theme colors and consistent values
- **CSS Grid** for responsive calendar layout
- **Flexbox** for alignment and spacing
- **CSS Transitions** for smooth animations
- **Media Queries** for responsive breakpoints at 1024px, 768px, and 480px

### Theme System

Four preset color schemes with consistent variable names:
```css
--primary-color    /* Main action color */
--secondary-color  /* Light background for selections */
```

Easily add new themes by adding new color definitions and corresponding CSS class.

## 💻 Usage

### Basic Integration

```jsx
import Calendar from './components/Calendar'

function App() {
  return <Calendar />
}
```

### Customization

To customize the hero image, modify the default in `Calendar.jsx`:

```jsx
const [heroImage, setHeroImage] = useState(
  'https://your-image-url.com/image.jpg'
);
```

To add new themes, update the theme switcher button colors and add corresponding CSS:

```css
.calendar-container.theme-newtheme {
  --primary-color: #yourcolor1;
  --secondary-color: #yourcolor2;
}
```

## 📱 Responsive Breakpoints

### Desktop (1024px and above)
- Side-by-side layout (hero image + calendar grid)
- Sticky hero image on scroll
- Full-size theme switcher
- Optimal spacing and typography

### Tablet (768px - 1024px)
- Stacked layout
- Calendar and notes in column layout
- Adjusted spacing and font sizes

### Mobile (480px - 768px)
- Full-width single column
- Adjusted calendar grid sizing
- Touch-friendly button dimensions (36px minimum)
- Simplified spacing

### Small Mobile (below 480px)
- Optimized for small screens
- Minimized padding and margins
- Adjusted font sizes for readability
- Touch-optimized controls

## 🎯 User Interactions

### Date Selection
1. Click a date to select it as the start date
2. Click a second date to set it as the end date (automatically reorders if needed)
3. Click "Clear Selection" to reset
4. Selected dates and the range are visually highlighted

### Adding Notes
1. Click on any date in the calendar
2. Type your note in the textarea
3. Click "Save Note" to persist the note
4. Notes appear in the "Saved Notes" section with a date label
5. Click the delete button (🗑️) to remove a note

### Theme Switching
Click the colored dots in the top-right to switch between themes:
- Blue (default, professional)
- Coral (warm, approachable)
- Emerald (fresh, natural)
- Purple (creative, elegant)

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📊 Performance Optimizations

- Efficient date calculations using JavaScript Date API
- CSS Grid for optimal layout performance
- Minimal re-renders with React hooks
- Hardware-accelerated CSS transforms
- Optimized initial bundle size

## 🎨 CSS/Styling Highlights

- **Modern Design System**: Custom properties for consistent theming
- **Accessibility**: Proper contrast ratios, focus states, and ARIA labels where needed
- **Smooth Animations**: Cubic-bezier transitions for natural motion
- **Print Styles**: Optimized styles for printing the calendar

## 🚀 Future Enhancement Ideas

- Recurring events support
- Calendar event synchronization (Google Calendar, Outlook)
- Drag-and-drop date selection
- Multiple month view
- Holiday markers and special dates
- Custom color picker for themes
- Export/import notes functionality
- Dark mode support
- Keyboard navigation and accessibility improvements

## 📝 Code Quality

- Clean, well-organized component structure
- Descriptive variable and function names
- Comprehensive CSS documentation
- No external UI library dependencies
- Single responsibility principle across functions

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize for your own use.

## 📜 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a demonstration of modern React component development with a focus on:
- Component architecture and state management
- Responsive design principles
- CSS expertise and styling techniques
- User experience and interaction design
- Production-ready code quality

---

**Made with ❤️ using React + Vite**

"# Calender" 
