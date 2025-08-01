import React, { useState } from 'react';
import { FaBell, FaCalendarAlt, FaExclamationTriangle,  FaFilePdf } from 'react-icons/fa';
import './../../pagescss/ExamNotices.css';

function ExamNotices() {
  const [activeFilter, setActiveFilter] = useState('all');

  const notices = [
    {
      id: 1,
      title: "Final Exam Schedule Released",
      date: "2023-11-15",
      category: "schedule",
      priority: "high",
      content: "The final examination schedule for all subjects has been published. Please check your exam dates and timings carefully.",
      attachment: "exam-schedule.pdf"
    },
    {
      id: 2,
      title: "Admit Card Download Available",
      date: "2023-11-20",
      category: "admit-card",
      priority: "high",
      content: "Admit cards for the upcoming examinations are now available for download from the student portal.",
      attachment: "admit-card-guide.pdf"
    },
    {
      id: 3,
      title: "Syllabus Update for Mathematics",
      date: "2023-11-05",
      category: "syllabus",
      priority: "medium",
      content: "Chapter 5 (Statistics) has been removed from the Mathematics syllabus for this academic year."
    },
    {
      id: 4,
      title: "Exam Center Change Notification",
      date: "2023-11-10",
      category: "location",
      priority: "high",
      content: "The exam center for students with roll numbers 100-150 has been changed from Building A to Building C."
    },
    {
      id: 5,
      title: "Important Guidelines for Exam Day",
      date: "2023-11-18",
      category: "guidelines",
      priority: "medium",
      content: "Please review the examination guidelines regarding allowed materials, dress code, and reporting time.",
      attachment: "exam-guidelines.pdf"
    },
    {
      id: 6,
      title: "Result Declaration Date",
      date: "2023-12-25",
      category: "results",
      priority: "low",
      content: "The final examination results will be declared on December 25th at 10:00 AM."
    }
  ];

  const filteredNotices = activeFilter === 'all' 
    ? notices 
    : notices.filter(notice => notice.category === activeFilter);

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return <FaExclamationTriangle className="priority-high" />;
      case 'medium': return <FaExclamationTriangle className="priority-medium" />;
      default: return <FaExclamationTriangle className="priority-low" />;
    }
  };

  return (
    <div className="exam-notices-page">
      <header className="notices-header">
        <div className="header-content">
          <h1><FaBell /> Exam Notices</h1>
          <p>Important announcements and updates regarding your examinations</p>
        </div>
      </header>

      <div className="notices-container">
        <div className="filter-options">
          <button 
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => setActiveFilter('all')}
          >
            All Notices
          </button>
          <button 
            className={activeFilter === 'schedule' ? 'active' : ''}
            onClick={() => setActiveFilter('schedule')}
          >
            Schedules
          </button>
          <button 
            className={activeFilter === 'admit-card' ? 'active' : ''}
            onClick={() => setActiveFilter('admit-card')}
          >
            Admit Cards
          </button>
          <button 
            className={activeFilter === 'syllabus' ? 'active' : ''}
            onClick={() => setActiveFilter('syllabus')}
          >
            Syllabus
          </button>
          <button 
            className={activeFilter === 'location' ? 'active' : ''}
            onClick={() => setActiveFilter('location')}
          >
            Locations
          </button>
        </div>

        <div className="notices-list">
          {filteredNotices.map((notice) => (
            <div key={notice.id} className={`notice-card priority-${notice.priority}`}>
              <div className="notice-header">
                <div className="notice-title">
                  {getPriorityIcon(notice.priority)}
                  <h2>{notice.title}</h2>
                </div>
                <div className="notice-date">
                  <FaCalendarAlt /> {new Date(notice.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <div className="notice-content">
                <p>{notice.content}</p>
              </div>
              {notice.attachment && (
                <div className="notice-attachment">
                  <FaFilePdf />
                  <a href={`/attachments/${notice.attachment}`} download>
                    Download Attachment
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamNotices;