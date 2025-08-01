// models.js
const mongoose = require('mongoose');


const classVideoSchema = new mongoose.Schema({
    type: String,
    subject: String,
    topic: String,
    name: String,
    img: String,
    link: String,
});
const ClassVideo = mongoose.model('ClassVideo', classVideoSchema, 'classvideo');

// Define Schema for Questions Collection
const questionsSchema = new mongoose.Schema({
    type: String,
    subject: String,
    topic: String,
    quiz: Number,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    answer: String
});
const Questions = mongoose.model('Questions', questionsSchema, 'questions');

// In your User model file
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },  
    email: { type: String },  
    password: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

const pdfSchema = new mongoose.Schema({
    book: { type: String, required: false },
    name: { type: String, required: true }, 
    type: { type: String, required: true }, 
    subject: { type: String, required: true }, 
    pdfPath: { type: String, required: true }, 
});
const Pdf = mongoose.model("Pdf", pdfSchema);

// Define Schema for payment Collection
const PaymentSchema = new mongoose.Schema({
    userName: String,
    phone: String,
    amount: Number,
    buyed: String,
    paymentId: String,
    date: { type: Date, default: Date.now }
});
const Payment = mongoose.model('Payment', PaymentSchema, 'payment');


module.exports = { Payment,  ClassVideo, Questions, User, Pdf };