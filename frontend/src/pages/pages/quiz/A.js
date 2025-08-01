import React, { useState, useEffect, useCallback } from "react";

function QuizStarting() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // NOTE: For this to work, you need a local server running at http://localhost:3000
        // that serves a JSON array of questions at the /questions endpoint.
        // Example structure for a question object from your API:
        // {
        //   "id": 1,
        //   "question": "What is 2 + 2?",
        //   "option1": "3",
        //   "option2": "4",
        //   "option3": "5",
        //   "option4": "6",
        //   "correctAnswer": "4",
        //   "subject": "math"
        // }
        const response = await fetch('http://localhost:3000/questions');
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }
        const data = await response.json();

        // Transform the fetched data to match the component's expected structure
        // Assuming options are option1, option2, option3, option4
        const transformedData = data.map(q => ({
          ...q,
          options: [q.option1, q.option2, q.option3, q.option4].filter(Boolean) // Filter out null/undefined options
        }));

        setQuestions(transformedData);
        setSelectedAnswers(Array(transformedData.length).fill(null));
        setMarkedQuestions(Array(transformedData.length).fill(false));
        setTimeLeft(transformedData.length * 60); // Set total time based on fetched questions (1 minute per question)
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load quiz questions. Please ensure the local server is running and try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []); // Empty dependency array means this runs once on mount

  // Timer effect
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isLoading && questions.length > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isLoading && questions.length > 0) {
      handleSubmit(); // Auto-submit when time runs out
    }
    return () => clearInterval(timer);
  }, [timeLeft, isLoading, questions.length]);

  // Helper function to format time (HH:MM:SS)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOptionChange = (event) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = event.target.value;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleQuestionButtonClick = (index) => {
    setCurrentQuestion(index);
    // Close the left panel on mobile after selecting a question
    if (window.innerWidth < 768) { // Tailwind's 'md' breakpoint is 768px
      setIsLeftPanelOpen(false);
    }
  };

  const toggleMarkQuestion = () => {
    const updatedMarks = [...markedQuestions];
    updatedMarks[currentQuestion] = !updatedMarks[currentQuestion];
    setMarkedQuestions(updatedMarks);
  };

  const handleSubmit = () => {
    // Logic for submitting the quiz (e.g., calculate score, send to server, navigate to results)
    console.log("Quiz Submitted!");
    // You would typically navigate to a results page or show a modal here.
    // For this example, we'll just log and stop the timer.
    setTimeLeft(0); // Stop timer
  };

  // Function to toggle left panel visibility on mobile
  const toggleLeftPanel = () => {
    setIsLeftPanelOpen(!isLeftPanelOpen);
  };

  // Calculate counts for attended, unattended, marked questions using useCallback for performance
  const calculateCounts = useCallback(() => {
    const attended = selectedAnswers.filter((answer) => answer !== null).length;
    const marked = markedQuestions.filter((mark) => mark).length;
    return {
      attendedCount: attended,
      unattendedCount: questions.length - attended,
      markedCount: marked,
    };
  }, [selectedAnswers, markedQuestions, questions.length]);

  const { attendedCount, unattendedCount, markedCount } = calculateCounts();

  // --- Loading, Error, and No Questions States ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="mt-4 text-blue-700 text-xl font-bold">Loading Quiz Questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 font-inter text-red-700 text-xl p-8 rounded-lg shadow-md m-4 text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (questions.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
        <div className="text-gray-700 text-2xl p-8 bg-white rounded-lg shadow-xl">
          No quiz questions available. Please check the API endpoint.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-inter w-full">
      {/* Mobile Header (visible only on md:hidden) */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg w-full fixed top-0 left-0 z-30">
        <h1 className="text-2xl font-bold text-blue-700">Quiz Starting</h1>
        <button
          onClick={toggleLeftPanel}
          className="p-2 rounded-full bg-blue-100 text-blue-700 shadow-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open quiz overview"
        >
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Overlay for mobile when left panel is open */}
      {isLeftPanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleLeftPanel} // Close panel when clicking overlay
        ></div>
      )}

      {/* Left Section: Quiz Info and Question Navigation (Side Panel) */}
      <div className={`
        md:w-1/3 flex-col space-y-4 p-4 bg-blue-50 rounded-lg shadow-inner
        transition-transform duration-300 ease-in-out
        ${isLeftPanelOpen ? 'fixed inset-y-0 left-0 w-3/4 max-w-sm z-50 transform translate-x-0' : 'fixed inset-y-0 left-0 w-3/4 max-w-sm z-50 transform -translate-x-full'}
        md:static md:flex md:translate-x-0 md:mt-0 mt-20 /* Adjust mt for mobile header */
        overflow-y-auto h-full
      `}>
        {/* Close button for mobile (visible only when panel is open on mobile) */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={toggleLeftPanel}
            className="p-2 rounded-full bg-red-100 text-red-700 shadow-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close quiz overview"
          >
            {/* Close Icon (X) */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="timer-section text-center text-xl font-semibold text-red-600 bg-red-100 p-3 rounded-lg shadow-md">
          <h2>Time Left: {formatTime(timeLeft)}</h2>
        </div>

        <div className="question-summary-section bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-gray-700 mb-3">Total Questions: <span className="font-bold">{questions.length}</span></p>
          <div className="questions-markbar grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <p className="attended-count bg-green-500 text-white py-2 px-4 rounded-lg shadow-md">
              Attended: <span className="font-bold">{attendedCount}</span>
            </p>
            <p className="unattended-count bg-blue-400 text-white py-2 px-4 rounded-lg shadow-md">
              Unattended: <span className="font-bold">{unattendedCount}</span>
            </p>
            <p className="marked-count bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md">
              Marked: <span className="font-bold">{markedCount}</span>
            </p>
          </div>
        </div>

        <div className="question-buttons-grid grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 gap-2 p-4 bg-gray-100 rounded-lg shadow-md flex-grow overflow-y-auto">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`
                question-button
                w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold
                transition-all duration-200 ease-in-out
                shadow-md hover:scale-105
                ${selectedAnswers[index] !== null ? "bg-green-400 text-white" : "bg-blue-300 text-gray-800"}
                ${currentQuestion === index ? "border-4 border-red-500 scale-110 ring-2 ring-red-300" : ""}
                ${markedQuestions[index] ? "bg-yellow-400 text-gray-800" : ""}
              `}
              onClick={() => handleQuestionButtonClick(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section: Question Content and Actions */}
      <div className={`
        md:w-2/3 flex flex-col space-y-6 p-4 bg-gray-50 rounded-lg shadow-inner
        flex-grow md:ml-4 md:mt-0 mt-20 /* Adjust mt for mobile header */
        ${isLeftPanelOpen ? 'hidden' : 'flex'} md:flex
      `}>
        <div className="question-section bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            <span className="text-blue-600 mr-2">{currentQuestion + 1}.</span> {questions[currentQuestion]?.question}
          </p>
        </div>

        <div className="options-section bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-200">
          {questions[currentQuestion]?.options.map((option, index) => (
            <div key={index} className="flex items-center">
              <label className="flex items-center cursor-pointer text-lg text-gray-700 w-full p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedAnswers[currentQuestion] === option}
                  onChange={handleOptionChange}
                  className="form-radio h-5 w-5 text-blue-600 transition-colors duration-200 focus:ring-blue-500 mr-3"
                />
                {option}
              </label>
            </div>
          ))}
        </div>

        <div className="actions-section flex flex-wrap justify-end gap-3 mt-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={toggleMarkQuestion}
            className={`
              ${markedQuestions[currentQuestion] ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-600"}
              text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105
            `}
          >
            {markedQuestions[currentQuestion] ? "Unmark" : "Mark"}
          </button>
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizStarting;