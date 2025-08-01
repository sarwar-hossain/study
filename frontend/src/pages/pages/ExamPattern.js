import { FaClock, FaListOl, FaPercentage, FaBook, FaCheckCircle } from 'react-icons/fa';
import './../../pagescss/ExamPattern.css';

function ExamPattern() {
  

  const examPatterns = [
    {
      id: 1,
      subject: 'Mathematics',
      duration: '3 hours',
      totalMarks: 100,
      sections: [
        { name: 'Algebra', marks: 30, questions: 15 },
        { name: 'Calculus', marks: 35, questions: 18 },
        { name: 'Geometry', marks: 25, questions: 12 },
        { name: 'Statistics', marks: 10, questions: 5 }
      ],
      passingCriteria: '40% aggregate and 30% in each section',
      importantNotes: [
        'Use of calculator not allowed',
        'Show all working for full marks'
      ]
    },
    {
      id: 2,
      subject: 'Physics',
      duration: '2.5 hours',
      totalMarks: 80,
      sections: [
        { name: 'Mechanics', marks: 30, questions: 10 },
        { name: 'Electromagnetism', marks: 25, questions: 8 },
        { name: 'Thermodynamics', marks: 15, questions: 5 },
        { name: 'Optics', marks: 10, questions: 4 }
      ],
      passingCriteria: '35% aggregate and 25% in each section',
      importantNotes: [
        'Formula sheet provided',
        'Numerical problems carry more weight'
      ]
    },
    {
      id: 3,
      subject: 'Chemistry',
      duration: '2.5 hours',
      totalMarks: 80,
      sections: [
        { name: 'Organic', marks: 30, questions: 12 },
        { name: 'Inorganic', marks: 25, questions: 10 },
        { name: 'Physical', marks: 25, questions: 10 }
      ],
      passingCriteria: '35% aggregate',
      importantNotes: [
        'Periodic table provided',
        'Balanced equations required'
      ]
    },
    {
      id: 4,
      subject: 'Biology',
      duration: '2 hours',
      totalMarks: 70,
      sections: [
        { name: 'Botany', marks: 30, questions: 15 },
        { name: 'Zoology', marks: 30, questions: 15 },
        { name: 'Biotechnology', marks: 10, questions: 5 }
      ],
      passingCriteria: '33% aggregate',
      importantNotes: [
        'Diagrams must be labeled properly',
        'Long answers should be point-wise'
      ]
    }
  ];

  return (
    <div className="exam-pattern-page">
      <header className="page-header">
        <h1>Exam Pattern</h1>
        <p>Detailed structure and marking scheme for all subjects</p>
      </header>

    

      <div className="patterns-container">
        {examPatterns.map((pattern) => (
          <div key={pattern.id} className="pattern-card">
            <div className="pattern-header">
              <h2>{pattern.subject}</h2>
              <div className="pattern-meta">
                <span className="meta-item">
                  <FaClock /> {pattern.duration}
                </span>
                <span className="meta-item">
                  <FaListOl /> Total Marks: {pattern.totalMarks}
                </span>
              </div>
            </div>

            <div className="pattern-sections">
              <h3><FaBook /> Sections Breakdown</h3>
              <table>
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Marks</th>
                    <th>Questions</th>
                  </tr>
                </thead>
                <tbody>
                  {pattern.sections.map((section, index) => (
                    <tr key={index}>
                      <td>{section.name}</td>
                      <td>{section.marks}</td>
                      <td>{section.questions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pattern-details">
              <div className="detail-item">
                <h4><FaPercentage /> Passing Criteria</h4>
                <p>{pattern.passingCriteria}</p>
              </div>

              <div className="detail-item">
                <h4><FaCheckCircle /> Important Notes</h4>
                <ul>
                  {pattern.importantNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamPattern;