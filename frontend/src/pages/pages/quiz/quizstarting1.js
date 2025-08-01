import React, { useState, useEffect } from "react";

function QuizStarting() {
  const [questions, setQuestions] = useState([]); // Renamed setQuestion to setQuestions for clarity
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state for loading indicator
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors
      try {
        const response = await fetch('http://localhost:3000/questions');
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }
        const data = await response.json();

        // Transform the fetched data to match the component's expected structure
        const transformedData = data.map(q => ({
          ...q,
          options: [q.option1, q.option2, q.option3, q.option4].filter(Boolean) // Filter out null/undefined options
        }));

        setQuestions(transformedData);
        // Initialize states based on the transformed data
        setSelectedAnswers(Array(transformedData.length).fill(null));
        setMarkedQuestions(Array(transformedData.length).fill(false));
        setTimeLeft(transformedData.length * 60); // Set total time based on fetched questions
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load quiz questions. Please try again later.');
      } finally {
        setIsLoading(false); // Set loading to false after fetching (success or error)
      }
    };
    fetchQuestions();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (timeLeft > 0 && !isLoading) { // Only start timer if not loading and time is left
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isLoading && questions.length > 0) { // Auto-submit when time runs out and questions are loaded
      handleSubmit();
    }
  }, [timeLeft, isLoading, questions.length]); // Add questions.length to dependencies for timer logic

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
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
    // Logic for submitting the quiz
    console.log("Quiz Submitted!"); // Replaced alert with console.log
    // In a real app, you would navigate away or show a custom results modal here.
  };

  // Function to toggle left panel visibility on mobile
  const toggleLeftPanel = () => {
    setIsLeftPanelOpen(!isLeftPanelOpen);
  };

  const attendedCount = selectedAnswers.filter((answer) => answer !== null).length;
  const unattendedCount = questions.length - attendedCount;
  const markedCount = markedQuestions.filter((mark) => mark).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
        <div className="text-blue-700 text-3xl font-bold">Loading Quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 font-inter text-red-700 text-xl p-4 rounded-lg shadow-md m-4">
        <p>{error}</p>
      </div>
    );
  }

  if (questions.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
        <div className="text-gray-700 text-2xl">No quiz questions available.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-inter w-full mt-8">
      {/* Mobile Header (visible only on md:hidden) */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg w-full">
        <h1 className="text-2xl font-bold text-blue-700">Quiz Starting</h1>
        <button onClick={toggleLeftPanel} className="p-2 rounded-full bg-blue-100 text-blue-700 shadow-md">
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Left Section: Quiz Info and Question Navigation */}
      <div className={`
        md:w-1/3 flex-col space-y-2 mt-8 p-4 bg-blue-50 rounded-lg shadow-inner
        ${isLeftPanelOpen ? 'fixed inset-0 z-50 flex' : 'hidden'} md:relative md:flex
        overflow-y-auto
      `}>
        {/* Close button for mobile (visible only when panel is open on mobile) */}
        <div className="md:hidden flex justify-end">
          <button onClick={toggleLeftPanel} className="p-2 rounded-full bg-red-100 text-red-700 shadow-md">
            {/* Close Icon (X) */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="timer-section text-center text-xl font-semibold text-red-600 bg-red-100 p-1 rounded-lg shadow-md">
          <h2>Time Left: {formatTime(timeLeft)}</h2>
        </div>

        <div className="question-summary-section bg-gray-100 p-3 rounded-lg shadow-md">
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

        <div className="question-buttons-grid grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 gap-2 p-4 bg-gray-100 rounded-lg shadow-md overflow-y-auto max-h-96">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`
                question-button
                p-3 rounded-full text-lg font-semibold
                transition-all duration-200 ease-in-out
                shadow-md hover:scale-105
                ${selectedAnswers[index] ? "bg-green-400 text-white" : "bg-blue-300 text-gray-800"}
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
        md:w-2/3 flex flex-col space-y-6 p-3 bg-gray-50 rounded-lg shadow-inner
        ${isLeftPanelOpen ? 'hidden' : 'flex'} md:flex
        flex-grow
      `}>
        <div className="question-section bg-white p-6 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            <span className="text-blue-600">{currentQuestion + 1}.</span> {questions[currentQuestion]?.question}
          </p>
        </div>

        <div className="options-section bg-white p-6 rounded-lg shadow-md space-y-4">
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

        <div className="actions-section flex flex-wrap justify-end gap-2 mt-auto p-3 bg-white rounded-lg shadow-md">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
