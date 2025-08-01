import React from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaPercentage,
  FaClipboardList,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaRegLightbulb
} from 'react-icons/fa';
import './../../pagescss/AboutExam.css';

function AboutExam() {
  const examDetails = {
    name: "Annual Board Examination",
    conductingBody: "National Education Board",
    purpose: "To assess student learning and certify completion of course requirements",
    lastUpdated: "January 2023"
  };

  const examStructure = [
    {
      title: "Exam Duration",
      value: "3 hours",
      icon: <FaClock size={24} />,
      color: "#3498db"
    },
    {
      title: "Total Marks",
      value: "100 per subject",
      icon: <FaPercentage size={24} />,
      color: "#2ecc71"
    },
    {
      title: "Number of Papers",
      value: "6 core subjects",
      icon: <FaClipboardList size={24} />,
      color: "#e74c3c"
    },
    {
      title: "Passing Criteria",
      value: "40% aggregate (33% for reserved categories)",
      icon: <FaUserGraduate size={24} />,
      color: "#9b59b6"
    }
  ];

  const preparationTips = [
    "Focus on NCERT/state board textbooks as they cover 80% of the syllabus",
    "Practice previous year question papers to understand the pattern",
    "Create a revision timetable and stick to it",
    "Take regular mock tests to improve time management",
    "Pay special attention to diagrams in science subjects and maps in geography",
    "For language papers, practice writing essays and letters within time limits"
  ];

  const importantDates = [
    { event: "Registration begins", date: "1st October 2023" },
    { event: "Last date for registration", date: "31st October 2023" },
    { event: "Admit card available", date: "1st February 2024" },
    { event: "Theory exams commence", date: "15th February 2024" },
    { event: "Practical exams", date: "1st-10th March 2024" },
    { event: "Result declaration", date: "15th May 2024" }
  ];

  return (
    <div className="about-exam-page">
      <header className="exam-header">
        <h1>About {examDetails.name}</h1>
        <p className="conducting-body">
          Conducted by: {examDetails.conductingBody} | Last updated: {examDetails.lastUpdated}
        </p>
      </header>

      <section className="exam-overview">
        <h2><FaBook /> Exam Overview</h2>
        <p>{examDetails.purpose}</p>
        
        <div className="exam-stats">
          {examStructure.map((item, index) => (
            <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${item.color}` }}>
              <div className="stat-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="stat-content">
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="exam-dates">
        <h2><FaCalendarAlt /> Important Dates</h2>
        <div className="timeline">
          {importantDates.map((date, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{date.event}</h3>
                <p>{date.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="preparation-tips">
        <h2><FaChalkboardTeacher /> Preparation Tips</h2>
        <div className="tips-grid">
          {preparationTips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-icon">
                <FaRegLightbulb size={20} />
              </div>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="additional-info">
        <h2>Additional Information</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Exam Centers</h3>
            <p>Exams are conducted at designated schools and colleges across the country. Your admit card will specify your allocated center.</p>
          </div>
          <div className="info-card">
            <h3>Grading System</h3>
            <p>Grades are awarded on a 9-point scale (A1 to E2). A1 represents 91-100% marks while E2 represents below 33%.</p>
          </div>
          <div className="info-card">
            <h3>Re-evaluation</h3>
            <p>Students can apply for re-evaluation within 15 days of result declaration. A nominal fee applies.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutExam;