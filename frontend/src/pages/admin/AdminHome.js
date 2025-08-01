import React from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css'; // Reuse or modify CSS

function AdminHome() {
  const studyOptions = [
    { 
      id: 1, 
      name: 'Syllabus', 
      icon: <span style={{ fontSize: '32px' }}>📑</span>,
      path: '/syllabus' 
    },
    { 
      id: 2, 
      name: 'Class', 
      icon: <span style={{ fontSize: '32px' }}>👨‍🏫</span>,
      path: '/class' 
    },
    { 
      id: 3, 
      name: 'Books', 
      icon: <span style={{ fontSize: '32px' }}>📚</span>,
      path: '/books' 
    },
    { 
      id: 4, 
      name: 'Notes', 
      icon: <span style={{ fontSize: '32px' }}>🗒️</span>,
      path: '/notes' 
    },
    { 
      id: 5, 
      name: 'Formulas', 
      icon: <span style={{ fontSize: '32px' }}>∫</span>,
      path: '/formulas' 
    },
    { 
      id: 6, 
      name: 'Practice Questions', 
      icon: <span style={{ fontSize: '32px' }}>✍️</span>,
      path: '/practice-questions' 
    },
    { 
      id: 7, 
      name: 'Quiz', 
      icon: <span style={{ fontSize: '32px' }}>✏️</span>,
      path: '/quiz' 
    },
    { 
      id: 8, 
      name: 'Prev Year Questions', 
      icon: <span style={{ fontSize: '32px' }}>🗃️</span>,
      path: '/previous-year-questions' 
    },
    { 
      id: 9, 
      name: 'Exam Pattern', 
      icon: <span style={{ fontSize: '32px' }}>📊</span>,
      path: '/exam-pattern' 
    },
    { 
      id: 10, 
      name: 'Exam Notices', 
      icon: <span style={{ fontSize: '32px' }}>📢</span>,
      path: '/exam-notices' 
    },
    { 
      id: 11, 
      name: 'About Exam', 
      icon: <span style={{ fontSize: '32px' }}>ℹ️</span>,
      path: '/about-exam' 
    },
    { 
      id: 12, 
      name: 'Study Plan', 
      icon: <span style={{ fontSize: '32px' }}>⏳</span>,
      path: '/rgba(2, 2, 2, 1)lan' 
    }
  ];

  return (
    <div className="admin-home">
      <div className="study-grid">
        {studyOptions.map((option) => (
          <Link
            to={option.path}
            key={option.id}
            className="study-card-link"
          >
            <div
              className="study-card"
              style={{ backgroundColor: option.color }}
            >
              <div className="card-icon">{option.icon}</div>
              <h3>{option.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
