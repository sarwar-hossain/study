import React from 'react';
import { Link } from 'react-router-dom';
import './../../pagescss/Home.css';
import studyOptions from './studyOptions';


function Home() {

  return (
    <div className="study-app">

      <header className="app-header">
        <h1>StudyHub</h1>
        <p>Your one-stop learning platform</p>
      </header>

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

export default Home;