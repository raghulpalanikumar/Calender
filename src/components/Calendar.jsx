import { useState, useMemo, useCallback } from 'react';
import '../styles/Calendar.css';

// Constants
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const HOLIDAYS = {
  '0-1': { name: '🎆 New Year', emoji: '🎆' },
  '0-14': { name: '🪁 Pongal / Makar Sankranti', emoji: '🪁' },
  '0-16': { name: '🌾 Mattu Pongal', emoji: '🌾' },
  '0-26': { name: '🇮🇳 Republic Day', emoji: '🇮🇳' },
  '1-15': { name: '🌸 Vasant Panchami', emoji: '🌸' },
  '1-16': { name: '🙏 Maha Shivaratri', emoji: '🙏' },
  '2-3': { name: '🎨 Holi', emoji: '🎨' },
  '2-20': { name: '🌙 Eid al-Fitr', emoji: '🌙' },
  '2-27': { name: '🙏 Ram Navami', emoji: '🙏' },
  '2-28': { name: '🎏 Ugadi', emoji: '🎏' },
  '3-3': { name: '🙏 Good Friday', emoji: '🙏' },
  '3-5': { name: '✝️ Easter', emoji: '✝️' },
  '3-14': { name: '🪔 Akshaya Tritiya', emoji: '🪔' },
  '4-27': { name: '🐏 Bakrid / Eid al-Adha', emoji: '🐏' },
  '6-16': { name: '🛕 Rath Yatra', emoji: '🛕' },
  '7-15': { name: '🇮🇳 Independence Day', emoji: '🇮🇳' },
  '7-18': { name: '🎉 Raksha Bandhan', emoji: '🎉' },
  '7-26': { name: '🧿 Janmashtami', emoji: '🧿' },
  '8-10': { name: '🐘 Ganesh Chaturthi', emoji: '🐘' },
  '9-2': { name: '🙏 Gandhi Jayanti', emoji: '🙏' },
  '9-20': { name: '🎯 Dussehra', emoji: '🎯' },
  '10-8': { name: '🪔 Diwali', emoji: '🪔' },
  '10-9': { name: '✨ Govardhan Puja', emoji: '✨' },
  '10-10': { name: '👫 Bhai Dooj', emoji: '👫' },
  '10-25': { name: '🙏 Guru Nanak Jayanti', emoji: '🙏' },
  '11-25': { name: '🎄 Christmas', emoji: '🎄' }
};

const HERO_IMAGES = [
  '/813173-free-download-nature-hd-wallpapers-2560x1920-xiaomi.jpg',
  '/bOvf94dPRxWu0u3QsPjF_tree.jpg',
  '/e5d50e63cdb061b355dbcb4a28bdf266.jpeg',
  '/hills-2836301_1280.jpg',
  '/iAwDv7.webp',
  '/Natural-Download-HD-Computer-Desktop-Background.jpg',
  '/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg',
  '/wallpaper2you_488966.jpg',
  '/813173-free-download-nature-hd-wallpapers-2560x1920-xiaomi.jpg',
  '/bOvf94dPRxWu0u3QsPjF_tree.jpg',
  '/e5d50e63cdb061b355dbcb4a28bdf266.jpeg',
  '/hills-2836301_1280.jpg'
];

const STORAGE_KEY = 'calendarNotes';
const THEMES = ['blue', 'coral', 'emerald', 'purple'];

// Helper function to generate calendar grid
const generateCalendarDays = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};

const Calendar = () => {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState('');
  const [dateNotes, setDateNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load notes from localStorage:', error);
      return {};
    }
  });
  const [selectedDateForNote, setSelectedDateForNote] = useState(null);
  const [theme, setTheme] = useState('blue');
  const [isFlipping, setIsFlipping] = useState(false);

  // Memoized calendar days calculation
  const calendarDays = useMemo(() => generateCalendarDays(currentDate), [currentDate]);

  // Memoized handler functions
  const handleSaveNote = useCallback(() => {
    if (!selectedDateForNote) {
      alert('Please select a date to add notes');
      return;
    }
    
    if (!notes.trim()) {
      alert('Please enter a note');
      return;
    }

    try {
      const dateKey = selectedDateForNote.toISOString().split('T')[0];
      const updated = {
        ...dateNotes,
        [dateKey]: notes.trim()
      };
      setDateNotes(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setNotes('');
      setSelectedDateForNote(null);
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note');
    }
  }, [selectedDateForNote, notes, dateNotes]);

  const handleDeleteNote = useCallback((dateKey) => {
    try {
      const updated = { ...dateNotes };
      delete updated[dateKey];
      setDateNotes(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note');
    }
  }, [dateNotes]);

  const isDateInRange = useCallback((day) => {
    if (!day || !startDate || !endDate) return false;
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate > startDate && checkDate < endDate;
  }, [startDate, endDate, currentDate]);

  const isStartDate = useCallback((day) => {
    if (!day || !startDate) return false;
    return (
      day === startDate.getDate() &&
      startDate.getMonth() === currentDate.getMonth() &&
      startDate.getFullYear() === currentDate.getFullYear()
    );
  }, [startDate, currentDate]);

  const isEndDate = useCallback((day) => {
    if (!day || !endDate) return false;
    return (
      day === endDate.getDate() &&
      endDate.getMonth() === currentDate.getMonth() &&
      endDate.getFullYear() === currentDate.getFullYear()
    );
  }, [endDate, currentDate]);

  const isWeekend = useCallback((index) => index === 5 || index === 6, []);

  const isHoliday = useCallback((day) => {
    if (!day) return false;
    const key = `${currentDate.getMonth()}-${day}`;
    return HOLIDAYS[key];
  }, [currentDate]);

  const handlePreviousMonth = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
      setIsFlipping(false);
    }, 300);
  }, []);

  const handleNextMonth = useCallback(() => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
      setIsFlipping(false);
    }, 300);
  }, []);

  const handleThemeChange = useCallback((newTheme) => {
    if (THEMES.includes(newTheme)) {
      setTheme(newTheme);
    }
  }, []);

  const handleDateClick = useCallback((day) => {
    if (!day) return;

    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    if (!startDate) {
      setStartDate(clickedDate);
      setSelectedDateForNote(clickedDate);
      setEndDate(null);
    } else if (!endDate) {
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
      setSelectedDateForNote(null);
    } else {
      setStartDate(clickedDate);
      setEndDate(null);
      setSelectedDateForNote(clickedDate);
    }
  }, [startDate, endDate, currentDate]);

  const handleClearDates = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDateForNote(null);
  }, []);

  // Memoized values
  const heroImage = useMemo(() => HERO_IMAGES[currentDate.getMonth()], [currentDate]);

  return (
    <div className={`calendar-container theme-${theme}`}>
      {/* Theme Switcher */}
      <div className="theme-switcher">
        <button className={`theme-btn ${theme === 'blue' ? 'active' : ''}`} onClick={() => handleThemeChange('blue')} title="Blue">●</button>
        <button className={`theme-btn ${theme === 'coral' ? 'active' : ''}`} onClick={() => handleThemeChange('coral')} title="Coral">●</button>
        <button className={`theme-btn ${theme === 'emerald' ? 'active' : ''}`} onClick={() => handleThemeChange('emerald')} title="Emerald">●</button>
        <button className={`theme-btn ${theme === 'purple' ? 'active' : ''}`} onClick={() => handleThemeChange('purple')} title="Purple">●</button>
      </div>

      {/* Calendar Card */}
      <div className={`calendar-card ${isFlipping ? 'flipping' : ''}`}>
        {/* Spiral Binding */}
        <div className="spiral-binding"></div>

        {/* Hero Section */}
        <div className="hero-section">
          <img src={heroImage} alt="Calendar hero" className="hero-image" />
          <div className="month-badge">
            <span className="year">{currentDate.getFullYear()}</span>
            <span className="month">{MONTH_NAMES[currentDate.getMonth()]}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="content-wrapper">
          {/* Notes Section (Left) */}
          <div className="notes-panel">
            <h3 className="notes-title">Notes</h3>
            
            <div className="date-selector">
              {selectedDateForNote ? (
                <div className="selected-date">
                  {selectedDateForNote.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              ) : (
                <div className="no-date">Select a date</div>
              )}
            </div>

            <textarea
              className="notes-input"
              placeholder="Add your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
            />

            <button 
              className="save-note-btn"
              onClick={handleSaveNote}
              disabled={!selectedDateForNote || !notes.trim()}
            >
              Save
            </button>

            {Object.keys(dateNotes).length > 0 && (
              <div className="saved-notes-preview">
                <h4>Recent</h4>
                {Object.entries(dateNotes).slice(-3).map(([dateKey, note]) => (
                  <div key={dateKey} className="note-preview">
                    <div className="note-preview-content">
                      <div className="preview-date">{new Date(dateKey + 'T00:00:00').toLocaleDateString()}</div>
                      <div className="preview-text">{note.substring(0, 50)}...</div>
                    </div>
                    <button className="delete-note-btn" onClick={() => handleDeleteNote(dateKey)} title="Delete note">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calendar Section (Right) */}
          <div className="calendar-panel">
            {/* Navigation */}
            <div className="calendar-nav">
              <button className="nav-btn prev" onClick={handlePreviousMonth}>‹</button>
              <h2 className="month-year">{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button className="nav-btn next" onClick={handleNextMonth}>›</button>
            </div>

            {/* Weekday Headers */}
            <div className="weekday-header">
              {DAY_NAMES.map((day, idx) => (
                <div key={day} className={`weekday ${isWeekend(idx) ? 'weekend' : ''}`}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {calendarDays.map((day, index) => {
                const dateKey = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0] : null;
                const hasNote = dateKey && dateNotes[dateKey];
                const dayOfWeek = index % 7;
                const isWeek = isWeekend(dayOfWeek);

                return (
                  <div
                    key={index}
                    className={`calendar-day ${day ? 'active' : 'empty'} ${
                      isStartDate(day) ? 'start-date' : ''
                    } ${isEndDate(day) ? 'end-date' : ''} ${
                      isDateInRange(day) ? 'in-range' : ''
                    } ${isWeek ? 'weekend-day' : ''} ${hasNote ? 'has-note' : ''} ${isHoliday(day) ? 'holiday' : ''}`}
                    onClick={() => handleDateClick(day)}
                    title={isHoliday(day) ? isHoliday(day).name : ''}
                  >
                    {day && (
                      <div className="day-content">
                        <span className="day-number">{day}</span>
                        {isHoliday(day) && <span className="holiday-emoji">{isHoliday(day).emoji}</span>}
                        {hasNote && <span className="note-dot">•</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selection Info */}
            {(startDate || endDate) && (
              <div className="selection-info">
                <div>
                  {startDate && (
                    <p><strong>From:</strong> {startDate.toLocaleDateString()}</p>
                  )}
                  {endDate && (
                    <p><strong>To:</strong> {endDate.toLocaleDateString()}</p>
                  )}
                </div>
                <button className="clear-selection-btn" onClick={handleClearDates}>
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
