const express = require('express');
const router = express.Router();
const QuizSubmission = require('../models/QuizSubmission');

// POST /quizsubmissions - Submit new quiz results
router.post('/', async (req, res) => {
  try {
    const quizResult = new QuizSubmission(req.body);
    await quizResult.save();
    res.status(201).json({ message: 'Quiz results saved successfully!', data: quizResult });
  } catch (error) {
    console.error('Error saving quiz results:', error);
    res.status(400).json({ message: 'Failed to save quiz results.', error: error.message });
  }
});

// GET /quizsubmissions/:userId - Get all quiz results for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const results = await QuizSubmission.find({ userId: req.params.userId }).sort({ submittedAt: -1 });
    if (results.length === 0) {
      return res.status(404).json({ message: 'No quiz results found for this user.' });
    }
    res.json(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Error fetching quiz results.', error: error.message });
  }
});

// NEW ENDPOINT: GET /quizsubmissions/single/:submissionId - Get a single quiz result by submissionId
router.get('/', async (req, res) => {
  try {
    const results = await QuizSubmission.find({}).sort({ submittedAt: -1 }); // This should return an array
    res.json(results); // This sends an array of results
  } catch (error) {
    console.error('Error fetching all quiz results:', error);
    res.status(500).json({ message: 'Error fetching all quiz results.', error: error.message });
  }
});
// GET all unique quizIds
router.get('/existing-quizzes', async (req, res) => {
  try {
    const quizIds = await QuizSubmission.distinct('quizId');
    console.log('Fetched quiz IDs:', quizIds); // Debug log
    res.json(Array.isArray(quizIds) ? quizIds : []);
  } catch (error) {
    console.error('Error fetching quiz IDs:', error);
    res.status(500).json([]); // Always return an array
  }
});

// GET quiz submissions by quizId with statistics
router.get('/by-quiz/:quizId', async (req, res) => {
  try {
    const results = await QuizSubmission.find({ 
      quizId: req.params.quizId 
    }).sort({ submittedAt: -1 });

    const stats = {
      totalSubmissions: results.length,
      averageScore: results.reduce((sum, curr) => sum + (curr.score || 0), 0) / Math.max(1, results.length),
      bestScore: results.length > 0 ? Math.max(...results.map(r => r.score || 0)) : 0
    };

    res.json({
      submissions: results,
      statistics: stats
    });
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).json({
      submissions: [],
      statistics: {
        totalSubmissions: 0,
        averageScore: 0,
        bestScore: 0
      }
    });
  }
});
module.exports = router;