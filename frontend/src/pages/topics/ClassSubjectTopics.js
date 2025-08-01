import React from 'react';
import { Link } from 'react-router-dom';
import './../../pagescss/SubjectTopics.css';
import subject from './Topicts';

function ClassSubjectTopics(props) {


  return (
    <div className="subject-topics-page">
      <header className="subject-header" style={{ backgroundColor: subject.color }}>
        <div className="header-content">
          <div className="subject-icon">{subject.icon}</div>
          <div>
            <h1>Topics wise {props.subject} {props.type}</h1>
          </div>
        </div>
      </header>

      <div className="topics-container">
        {subject.topics.map((topic) => (
          <Link to={`/class-video/${btoa(props.type)}/${btoa(props.subject)}/${btoa(topic.topic)}/${btoa(topic.name)}`} className="link" >     
               <div key={topic.id} className="topic-card">
            <div className="topic-header">
              <h2>{topic.name}</h2>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ClassSubjectTopics;