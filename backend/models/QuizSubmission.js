const mongoose = require('mongoose');

// Quiz Results Schema
const QuizSubmissionSchema = new mongoose.Schema({
  // Add this field:
  submissionId: { type: String, unique: true, required: true }, // This will be a unique ID generated by the frontend

  userId: { type: String, required: true, index: true },
  quizId: { type: String, required: true },
  quizName: { type: String, required: true },
  score: { type: Number, required: true, min: 0 },
  totalQuestions: { type: Number, required: true, min: 1 },
  answers: [{
    questionId: { type: String, required: true },
    questionText: { type: String, required: true },
    userAnswer: { type: String },
    correctAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
  }],
  submittedAt: { type: Date, default: Date.now },
  timeTaken: { type: Number, required: true, min: 0 }
});

// Check if the model already exists before compiling it
const QuizSubmission = mongoose.models.QuizSubmission || mongoose.model('QuizSubmission', QuizSubmissionSchema);

module.exports = QuizSubmission;