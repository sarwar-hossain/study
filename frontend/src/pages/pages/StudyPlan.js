import React, { useState } from 'react';
import { FaBook, FaCalendarAlt, FaCheckCircle, FaRegCalendarCheck, FaChartLine } from 'react-icons/fa';
import './../../pagescss/StudyPlan.css';

function StudyPlan() {
  const [activeTab, setActiveTab] = useState('weekly');

  const subjects = [
    { id: 1, name: 'Mathematics', progress: 65, target: 'Algebra Basics' },
    { id: 2, name: 'Physics', progress: 42, target: 'Newton\'s Laws' },
    { id: 3, name: 'Chemistry', progress: 38, target: 'Chemical Bonds' },
    { id: 4, name: 'Biology', progress: 55, target: 'Cell Structure' },
    { id: 5, name: 'English', progress: 70, target: 'Essay Writing' },
    { id: 6, name: 'History', progress: 30, target: 'World War II' },
  ];

  const weeklyPlan = [
    { day: 'Monday', subjects: ['Mathematics', 'Physics'], completed: true },
    { day: 'Tuesday', subjects: ['Chemistry', 'English'], completed: false },
    { day: 'Wednesday', subjects: ['Biology', 'Mathematics'], completed: false },
    { day: 'Thursday', subjects: ['Physics', 'History'], completed: false },
    { day: 'Friday', subjects: ['English', 'Chemistry'], completed: false },
    { day: 'Saturday', subjects: ['Revision'], completed: false },
    { day: 'Sunday', subjects: ['Practice Tests'], completed: false },
  ];

  const monthlyGoals = [
    { goal: 'Complete Algebra syllabus', deadline: '15th', completed: false },
    { goal: 'Finish 5 practice tests', deadline: '20th', completed: false },
    { goal: 'Read 3 literature books', deadline: '25th', completed: false },
    { goal: 'Master chemical equations', deadline: '30th', completed: false },
  ];

  return (
    <div className="study-plan-page">
      <header className="page-header">
        <h1><FaBook /> My Study Plan</h1>
        <p>Organize your study schedule and track your progress</p>
      </header>

      <div className="progress-overview">
        <h2><FaChartLine /> Overall Progress</h2>
        <div className="subject-progress-grid">
          {subjects.map((subject) => (
            <div key={subject.id} className="subject-progress">
              <h3>{subject.name}</h3>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${subject.progress}%` }}
                >
                  <span>{subject.progress}%</span>
                </div>
              </div>
              <p className="current-target">
                <FaCheckCircle /> Current target: {subject.target}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="plan-tabs">
        <button 
          className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          <FaCalendarAlt /> Weekly Plan
        </button>
        <button 
          className={`tab-button ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          <FaRegCalendarCheck /> Monthly Goals
        </button>
      </div>

      <div className="plan-content">
        {activeTab === 'weekly' ? (
          <div className="weekly-plan">
            {weeklyPlan.map((day, index) => (
              <div 
                key={index} 
                className={`day-card ${day.completed ? 'completed' : ''}`}
              >
                <h3>{day.day}</h3>
                <ul>
                  {day.subjects.map((subject, i) => (
                    <li key={i}>{subject}</li>
                  ))}
                </ul>
                <button className="status-button">
                  {day.completed ? 'Completed ✓' : 'Mark Complete'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="monthly-goals">
            {monthlyGoals.map((goal, index) => (
              <div 
                key={index} 
                className={`goal-item ${goal.completed ? 'completed' : ''}`}
              >
                <div className="goal-info">
                  <h3>{goal.goal}</h3>
                  <p>Deadline: {goal.deadline}</p>
                </div>
                <button className="status-button">
                  {goal.completed ? 'Completed ✓' : 'Mark Complete'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="resources-section">
        <h2><FaBook /> Recommended Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>Mathematics</h3>
            <ul>
              <li>Algebra Textbook - Chapter 3-5</li>
              <li>Practice Workbook - Page 45-60</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Science</h3>
            <ul>
              <li>Physics Lab Manual</li>
              <li>Chemistry Reference Guide</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Languages</h3>
            <ul>
              <li>English Grammar Book</li>
              <li>Vocabulary Flashcards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyPlan;