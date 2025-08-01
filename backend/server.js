require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const path = require('path'); // Import path module
const connectDB = require('./db');
const classVideoRoutes = require('./routes/classVideoRoutes');
const questionsRoutes = require('./routes/questionsRoutes');
const quizSubmissionRoutes = require('./routes/quizSubmissionRoutes');
const PaymentRoutes = require('./routes/PaymentRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const userRoutes = require('./routes/userRoutes');



const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ 
  origin: 'http://localhost:3001', // Allow React frontend to access API
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.urlencoded({ extended: true })); // Replace bodyParser.urlencoded
app.use(express.json()); // Replace bodyParser.json
app.use(cookieParser()); // Use cookie-parser middleware

// Serve static files from the 'uploads' and 'pdfs' directories
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// Connect to MongoDB
connectDB();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.use('/classvideo', classVideoRoutes);
app.use('/questions', questionsRoutes);
app.use('/quizsubmissions', quizSubmissionRoutes);
app.use('/pdfs', pdfRoutes);
app.use('/payments', PaymentRoutes);
app.use('/', userRoutes);


// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));