import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuizSubmission from '../Database/QuizSubmission';
import Questions from '../Database/Questions';

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

function QuizDetailsPage() {
  const [filterByQuidIdallQuizSubmissions, setFilterByQuidIdallQuizSubmissions] = useState([]);
  const { quizId } = useParams();
  const { filterByPhoneAllQuizSubmissions } = QuizSubmission();
  const { questions } = Questions();

  useEffect(() => {
    if (quizId && filterByPhoneAllQuizSubmissions.length > 0) {
      const filtered = filterByPhoneAllQuizSubmissions.filter(data => data.quizId === quizId);
      setFilterByQuidIdallQuizSubmissions(filtered);
    } else {
      setFilterByQuidIdallQuizSubmissions([]);
    }
  }, [filterByPhoneAllQuizSubmissions, quizId]);

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">All Quiz Questions and Answers</h2>

        {filterByQuidIdallQuizSubmissions.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base">No quiz submissions found in the database.</p>
        ) : (
          <ul className="space-y-4 sm:space-y-6">
            {filterByQuidIdallQuizSubmissions.map((submission) => (
              <li key={submission.submissionId || submission._id} className="bg-gray-50 rounded-lg p-3 sm:p-5 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-gray-700 text-sm sm:text-base">
                      <span className="font-semibold">Quiz:</span> {submission.quizName}
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base">
                      <span className="font-semibold">Submitted At:</span> {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-gray-700 text-sm sm:text-base">
                      <span className="font-semibold">Score:</span> {submission.score * 4}/{submission.totalQuestions * 4}
                      <span className="ml-1 sm:ml-2">({Math.round(submission.score * 100 / submission.totalQuestions)}%)</span>
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base">
                      <span className="font-semibold">Time Taken:</span> {formatTime(submission.timeTaken)}
                    </p>
                  </div>
                </div>

                <h4 className="text-md sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 border-b pb-1 sm:pb-2">
                  Questions and Answers:
                </h4>

                <ul className="space-y-3 sm:space-y-4">
                  {submission.answers.map((answer, ansIndex) => {
                    const questionId = answer.questionId;
                    const correctAns = answer.correctAnswer;
                    const userAns = answer.userAnswer;
                    let correctAnswer = "Not correct ans";
                    let userAnswer = "No answered";

                    const questionData = questions.find(
                      submission => submission._id === questionId
                    );
                    const isData = !!questionData;

                    if (correctAns === "option1") {
                      correctAnswer = isData ? questionData.option1 : null;
                    } else if (correctAns === "option2") {
                      correctAnswer = isData ? questionData.option2 : null;
                    } else if (correctAns === "option3") {
                      correctAnswer = isData ? questionData.option3 : null;
                    } else if (correctAns === "option4") {
                      correctAnswer = isData ? questionData.option4 : null;
                    }

                    if (userAns === "option1") {
                      userAnswer = isData ? questionData.option1 : null;
                    } else if (userAns === "option2") {
                      userAnswer = isData ? questionData.option2 : null;
                    } else if (userAns === "option3") {
                      userAnswer = isData ? questionData.option3 : null;
                    } else if (userAns === "option4") {
                      userAnswer = isData ? questionData.option4 : null;
                    }

                    return (
                      <li
                        key={ansIndex}
                        className={`p-3 sm:p-4 rounded-md border-l-4 ${answer.isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
                      >
                        {answer.questionText === "n" ? (
                          <div className="flex justify-center sm:justify-end mb-2 sm:mb-0">
                            <image
                              src="/questionphoto/1.png" 
                              alt="Question image"
                              className="w-full max-w-[400px] sm:max-w-[400px] h-auto sm:float-right"
                            />
                          </div>
                        ) : (
                          <p className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                            {ansIndex + 1}: {answer.questionText}
                          </p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600">Your Answer:</p>
                            <p className={`font-medium text-sm sm:text-base ${answer.isCorrect ? "text-green-600" : "text-red-600"}`}>
                              {userAnswer}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600">Correct Answer:</p>
                            <p className="font-medium text-gray-800 text-sm sm:text-base">
                              {correctAnswer}
                            </p>
                          </div>
                        </div>
                        <p className={`mt-1 sm:mt-2 text-xs sm:text-sm font-medium ${answer.isCorrect ? "text-green-600" : "text-red-600"}`}>
                          {answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default QuizDetailsPage;