import React from 'react';
import { Link } from 'react-router-dom';

import './../../pagescss/Subjects.css';
import subjects from './Subjects';


function QuizSubjectPage(props) {

    return (


        <div className="subject-page">
            <header className="subject-header">
                <h1>Subject {props.name}</h1>
                <p>Test your knowledge with our subject-wise subjectzes</p>
                <br></br>

                <div className="subject-categories-head">
                    <Link to={`/quiz-number/${props.type}/${props.subject}/${props.topic}/${props.subjectName}`}
                        className="subject-card"
                    >
                        <div className="subject-card-header">

                            <h2>Start all subject quiz</h2>
                        </div>
                    </Link>
                </div>

            </header>





            <div className="subject-categories">
                {subjects.map((subject) => (
                    <Link
                        to={`/${props.link}/${subject.name.toLowerCase().replace(' ', '-')}`}
                        key={subject.id}
                        className="subject-card"
                        style={{ borderLeft: `5px solid ${subject.color}` }}
                    >
                        <div className="subject-card-header">
                            <div className="subject-icon" style={{ color: subject.color }}>
                                {subject.icon}
                            </div>
                            <h2>{subject.name}</h2>
                        </div>

                    </Link>
                ))}
            </div>
        </div>


    );
}

export default QuizSubjectPage;