import React from 'react';
import { Link } from 'react-router-dom';
import './../../pagescss/SubjectTopics.css';
import subject from './Topicts';

function QuizSubjectTopics(props) {

  const a = props.subject;
  const b = props.name;

  const nameOfSubject = a.charAt(0).toUpperCase() + a.slice(1) + " " + b.charAt(0).toLowerCase() + b.slice(1);

  return (
    <div className="subject-topics-page">
      <br></br>
      <header className="subject-header" style={{ backgroundColor: subject.color }}>
        <div className="header-content">
          <div className="subject-icon">{subject.icon}</div>
          <div>
            <h1>{nameOfSubject}</h1>
          </div>
        </div>
        <br></br>
        <Link to={`/quiz-number/${props.type}/${props.subject}/${props.topic}/${props.subjectName}`} className="link">
          <div className="topic-card-head">
            <h2>Start All topic quiz</h2>
          </div>
        </Link>

      </header>



      <div className="topics-container">
        {subject.topics.map((topic) => {


          return (
            <Link to={`/quiz-number/${props.type}/${props.subject}/${topic.topic}/${topic.name}`} className="link">

              <div key={topic.id} className="topic-card">
                <div className="topic-header">
                  <h2>{topic.name}</h2>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}

export default QuizSubjectTopics;