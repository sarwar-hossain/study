const studyOptions = [
  { 
    id: 1, 
    name: 'Syllabus', 
    icon: <span style={{ fontSize: '70px' }}>📑</span>,  // More syllabus-like than book
    path: '/syllabus' 
  },
  { 
    id: 2, 
    name: 'Class', 
    icon: <span style={{ fontSize: '70px' }}>👨‍🏫</span>,  // Teacher emoji
    path: '/class' 
  },
  { 
    id: 3, 
    name: 'Books', 
    icon: <span style={{ fontSize: '70px' }}>📚</span>,  // Stack of books
    path: '/books' 
  },
  { 
    id: 4, 
    name: 'Notes', 
    icon: <span style={{ fontSize: '70px' }}>🗒️</span>,  // Notepad
    path: '/notes' 
  },
  { 
    id: 5, 
    name: 'Formulas', 
    icon: <span style={{ fontSize: '70px' }}>∫</span>,  // Mathematical integral symbol
    path: '/formulas' 
  },
  { 
    id: 6, 
    name: 'Practice Questions', 
    icon: <span style={{ fontSize: '70px' }}>✍️</span>,  // Writing hand
    path: '/practice-questions' 
  },
  { 
    id: 7, 
    name: 'Quiz', 
    icon: <span style={{ fontSize: '70px' }}>✏️</span>,  // Pencil
    path: '/quiz' 
  },
  { 
    id: 8, 
    name: 'Previous Year Questions', 
    icon: <span style={{ fontSize: '70px' }}>🗃️</span>,  // File box
    path: '/previous-year-questions' 
  },
  { 
    id: 9, 
    name: 'Exam Pattern', 
    icon: <span style={{ fontSize: '70px' }}>📊</span>,  // Bar chart
    path: '/exam-pattern' 
  },
  { 
    id: 10, 
    name: 'Exam Notices', 
    icon: <span style={{ fontSize: '70px' }}>📢</span>,  // Megaphone
    path: '/exam-notices' 
  },
  { 
    id: 11, 
    name: 'About Exam', 
    icon: <span style={{ fontSize: '70px' }}>ℹ️</span>,  // Info - good as is
    path: '/about-exam' 
  },
  { 
    id: 12, 
    name: 'Study Plan', 
    icon: <span style={{ fontSize: '70px' }}>⏳</span>,  // Hourglass
    path: '/study-plan' 
  }
];

export default studyOptions;