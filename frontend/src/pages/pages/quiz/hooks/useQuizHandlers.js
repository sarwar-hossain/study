import { useState, useCallback } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const useQuizHandlers = (
  questions,
  phone,
  quizId,
  quizName,
  totalQuizTimeInSeconds,
  timeLeft
) => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [markedQuestions, setMarkedQuestions] = useState(Array(questions.length).fill(false));
  const [hasSelectedOption, setHasSelectedOption] = useState(Array(questions.length).fill(false));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const calculateScore = useCallback(() => {
    return selectedAnswers.reduce((acc, answer, index) => {
      if (answer === questions[index].answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [selectedAnswers, questions]);

  const handleOptionChange = useCallback((event) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setSelectedAnswers(updatedAnswers);

    const updatedSelectionStatus = [...hasSelectedOption];
    updatedSelectionStatus[currentQuestionIndex] = true;
    setHasSelectedOption(updatedSelectionStatus);
  }, [currentQuestionIndex, hasSelectedOption, selectedAnswers]);

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }, [questions.length]);

  const handlePreviousQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleQuestionButtonClick = useCallback((index) => {
    setCurrentQuestionIndex(index);
  }, []);

  const toggleMarkQuestion = useCallback(() => {
    const updatedMarks = [...markedQuestions];
    updatedMarks[currentQuestionIndex] = !updatedMarks[currentQuestionIndex];
    setMarkedQuestions(updatedMarks);
  }, [currentQuestionIndex, markedQuestions]);

  const handleSubmit = useCallback(async (isTimeUp = false) => {
    if (!isTimeUp && !window.confirm("Are you sure you want to submit your answers and finish the exam?")) {
      return;
    }

    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setIsSubmitted(true);

    const quizResults = {
      submissionId: uuidv4(),
      userId: phone,
      quizId: quizId,
      quizName: quizName,
      score: calculatedScore,
      totalQuestions: questions.length,
      answers: questions.map((question, index) => ({
        questionId: question._id || index + 1,
        questionText: question.question,
        userAnswer: selectedAnswers[index] || "Not answered",
        correctAnswer: question.answer,
        isCorrect: selectedAnswers[index] === question.answer,
      })),
      submittedAt: new Date().toISOString(),
      timeTaken: totalQuizTimeInSeconds - timeLeft,
      hasSelectedOption: hasSelectedOption,
    };

    try {
      await axios.post('http://localhost:3000/quizsubmissions', quizResults);
    } catch (error) {
      console.error('Error saving quiz results:', error.response?.data || error.message);
    }
  }, [calculateScore, phone, quizId, quizName, questions, selectedAnswers, totalQuizTimeInSeconds, timeLeft, hasSelectedOption]);

  const handleStartQuiz = useCallback(() => {
    setSelectedAnswers(Array(questions.length).fill(null));
    setMarkedQuestions(Array(questions.length).fill(false));
    setHasSelectedOption(Array(questions.length).fill(false));
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setScore(0);
  }, [questions.length]);

  return {
    selectedAnswers,
    markedQuestions,
    hasSelectedOption,
    currentQuestionIndex,
    isSubmitted,
    score,
    handleOptionChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleQuestionButtonClick,
    toggleMarkQuestion,
    handleSubmit,
    handleStartQuiz,
    setCurrentQuestionIndex,
    setIsSubmitted
  };
};