import { useParams, Link } from 'react-router-dom';
import './../../pagescss/SubjectTopics.css';
import Number from './../topics/QuizNumber';
import QuizSubmission from '../Database/QuizSubmission';

function QuizNumber() {
    const { type, subject, topic, subjectName } = useParams();
    const { filterByPhoneAllQuizSubmissions } = QuizSubmission();

    let quizLimit;

    if (subject !== "atoz" && topic !== "atoz") { quizLimit = 6 } else if (subject !== "atoz" && topic === "atoz") { quizLimit = 20 } else { quizLimit = 30 }

 

      
    return (
        <div className="subject-topics-page">
            <header className="subject-header" style={{ backgroundColor: subject.color }}>
                <div className="header-content">
                    <div className="subject-icon">{subject.icon}</div>
                    <div>
                        <h1>  {subjectName} quiz</h1>
                    </div>
                </div>
            </header>


            <div className="topics-container">
                {Number.map((quizNum) => {
                    const quizId = type + subject + topic + quizNum.quizNo;
                    const userSubmission = filterByPhoneAllQuizSubmissions.find(
                        submission => submission.quizId === quizId
                    );
                    const isUserQuiz = !!userSubmission;
                    const score = isUserQuiz ? userSubmission.score : null;
                    const totalQuestions = isUserQuiz ? userSubmission.totalQuestions : null;

                    return (
                        <>
                            {isUserQuiz ? (
                                <Link
                                    to={`/quiz-details/${quizId}`}
                                    className="link"
                                    key={quizNum.id}
                                >
                                    <div className="topic-card">
                                        <p>Quiz complete</p>
                                        <div className="topic-header">
                                            <h2>{quizNum.quizNo}: {subjectName}</h2>
                                        </div>
                                        <p>Score: {score * 4}/{totalQuestions * 4} ({Math.round(score * 100 / totalQuestions)}%)</p>

                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    to={`/number-of-questions/${type}/${subject}/${topic}/${quizNum.quizNo}/${subjectName}`}
                                    className="link"
                                    key={quizNum.id}
                                >
                                    <div className="topic-card">
                                        <div className="topic-header">
                                            <h2>{quizNum.quizNo}: {subjectName}</h2>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </>
                    );
                }).slice(0, quizLimit)}
            </div>


        </div>


    );
}

export default QuizNumber;