import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Admin Components
import AdminNavbar from './pages/admin/AdminNavbar';
import AddPdf from './pages/admin/AddPdf';
import Pdf from './pages/admin/Pdf';
import Users from './pages/admin/Users';
import AdminHome from './pages/admin/AdminHome';
import AddClassVideo from './pages/admin/AddClassVideo';
import AdminClassVideo from './pages/admin/AdminClassVideo';
import AdminQuizQuestions from './pages/admin/AdminQuizQuestions';
import AddQuizQuestions from './pages/admin/AddQuizQuestions';
import UpdatePdfPage from './pages/admin/UpdatePdfPage';
import UpdateClassVideo from './pages/admin/UpdateClassVideo';
import UpdateQuizQuestion from './pages/admin/UpdateQuizQuestion';
import PaymentHistory from './pages/admin/PaymentHistory';


// Auth Components
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Home Components
import Home from './pages/home/Home';
import Navbar from './pages/home/Navbar';
import ProfileView from './pages/home/ProfileView';

// Pages Components
import ExamPattern from './pages/pages/ExamPattern';
import StudyPlan from './pages/pages/StudyPlan';
import ExamNotices from './pages/pages/ExamNotices';
import AboutExam from './pages/pages/AboutExam';
import PDFViewer from './pages/pages/PDFViewer';
import ClassVideo from './pages/pages/ClassVideo';
import ClassVideoview from './pages/pages/ClassVideoView';

// Syllabus Components
import Syllabus from './pages/syllabus/Syllabus';
import SyllabusMath from './pages/syllabus/subjects/SyllabusMath';
import SyllabusPhys from './pages/syllabus/subjects/SyllabusPhys';
import SyllabusChem from './pages/syllabus/subjects/SyllabusChem';
import SyllabusBio from './pages/syllabus/subjects/SyllabusBio';

// Formulas Components
import Formulas from './pages/formulas/Formulas';
import FormulaMathTopics from './pages/formulas/subjects/FormulaMathTopics';
import FormulaPhysTopics from './pages/formulas/subjects/FormulaPhysTopics';
import FormulaChemTopics from './pages/formulas/subjects/FormulaChemTopics';
import FormulaBioTopics from './pages/formulas/subjects/FormulaBioTopics';

// Notes Components
import Notes from './pages/notes/Notes';
import NoteMathTopics from './pages/notes/subjects/NoteMathTopics';
import NotePhysTopics from './pages/notes/subjects/NotePhysTopics';
import NoteChemTopics from './pages/notes/subjects/NoteChemTopics';
import NoteBioTopics from './pages/notes/subjects/NoteBioTopics';

// Practice Questions Components
import PracticeQuestions from './pages/practicequestions/PracticeQuestions';
import PracticeQuestionsMathTopics from './pages/practicequestions/subjects/PracticeQuestionsMathTopics';
import PracticeQuestionsPhysTopics from './pages/practicequestions/subjects/PracticeQuestionsPhysTopics';
import PracticeQuestionsChemTopics from './pages/practicequestions/subjects/PracticeQuestionsChemTopics';
import PracticeQuestionsBioTopics from './pages/practicequestions/subjects/PracticeQuestionsBioTopics';

// Previous Year Questions Components
import PreviousYearQuestions from './pages/previousyearquestions/PreviousYearQuestions';
import PreviousYearQuestionsMathTopics from './pages/previousyearquestions/subjects/PreviousYearQuestionsMathTopics';
import PreviousYearQuestionsPhysTopics from './pages/previousyearquestions/subjects/PreviousYearQuestionsPhysTopics';
import PreviousYearQuestionsChemTopics from './pages/previousyearquestions/subjects/PreviousYearQuestionsChemTopics';
import PreviousYearQuestionsBioTopics from './pages/previousyearquestions/subjects/PreviousYearQuestionsBioTopics';

// Books Components
import Books from './pages/books/Books';
import Books1 from './pages/books/book1/Book1';
import Book1MathTopics from './pages/books/book1/subjects/Book1MathTopics';
import Book1PhysicsTopics from './pages/books/book1/subjects/Book1PhysicsTopics';
import Book1ChemistryTopics from './pages/books/book1/subjects/Book1ChemistryTopics';
import Book1BiologyTopics from './pages/books/book1/subjects/Book1BiologyTopics';
import Book2 from './pages/books/book2/Book2';
import Book2MathTopics from './pages/books/book2/subjects/Book2MathTopics';
import Book2PhysicsTopics from './pages/books/book2/subjects/Book2PhysicsTopics';
import Book2ChemistryTopics from './pages/books/book2/subjects/Book2ChemistryTopics';
import Book2BiologyTopics from './pages/books/book2/subjects/Book2BiologyTopics';
import Book3 from './pages/books/book3/Book3';
import Book3MathTopics from './pages/books/book3/subjects/Book3MathTopics';
import Book3PhysicsTopics from './pages/books/book3/subjects/Book3PhysicsTopics';
import Book3ChemistryTopics from './pages/books/book3/subjects/Book3ChemistryTopics';
import Book3BiologyTopics from './pages/books/book3/subjects/Book3BiologyTopics';
import Book4 from './pages/books/book4/Book4';
import Book4MathTopics from './pages/books/book4/subjects/Book4MathTopics';
import Book4PhysicsTopics from './pages/books/book4/subjects/Book4PhysicsTopics';
import Book4ChemistryTopics from './pages/books/book4/subjects/Book4ChemistryTopics';
import Book4BiologyTopics from './pages/books/book4/subjects/Book4BiologyTopics';

// Class Components
import Class from './pages/class/Class';
import ClassMathTopics from './pages/class/class/ClassMathTopics';
import ClassPhysicsTopics from './pages/class/class/ClassPhysicsTopics';
import ClassChemistryTopics from './pages/class/class/ClassChemistryTopics';
import ClassBiologyTopics from './pages/class/class/ClassBiologyTopics';

// Quiz Components
import Quiz from './pages/quiz/Quiz';
import QuizMathTopics from './pages/quiz/subjects/QuizMathTopics';
import QuizPhysicsTopics from './pages/quiz/subjects/QuizPhysicsTopics';
import QuizChemistryTopics from './pages/quiz/subjects/QuizChemistryTopics';
import QuizBiologyTopics from './pages/quiz/subjects/QuizBiologyTopics';
import QuizStarting from './pages/pages/QuizStarting';
import QuizDetailsPage from './pages/pages/QuizDetailsPage';
import QuizNumber from './pages/pages/QuizNumber';
import NumberOfQuestions from './pages/pages/NumberOfQuestions';

import Payment from './pages/payments/Payment';

import Otp from './pages/pages/Otp';
import UserTable from './pages/PhpPages/UserTable';
import FormComponent from './pages/PhpPages/FormComponent';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const adminPaths = [
    '/admin',
    '/admin/class-video',
    '/admin/questions',
    '/admin/pdf',
    '/admin/users',
    '/admin/payment-history',
    '/admin/add-class-video',
    '/admin/add-questions',
    '/admin/add-pdf',
    '/admin/update-pdf',
    '/admin/update-class-video',
    '/admin/update-quiz-question'
  ];

  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {isAdminRoute ? (
        <Routes>
          <Route path="/admin" element={<AdminNavbar />}>
            <Route index element={<AdminHome />} />
            <Route path="class-video" element={<AdminClassVideo />} />
            <Route path="questions" element={<AdminQuizQuestions />} />
            <Route path="pdf" element={<Pdf />} />
            <Route path="users" element={<Users />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="add-class-video" element={<AddClassVideo />} />
            <Route path="add-questions" element={<AddQuizQuestions />} />
            <Route path="add-pdf" element={<AddPdf />} />
            <Route path="update-pdf/:id" element={<UpdatePdfPage />} />
            <Route path="update-class-video/:id" element={<UpdateClassVideo />} />
            <Route path="update-quiz-question/:id" element={<UpdateQuizQuestion />} />
          </Route>
        </Routes>
      ) : (
        <>
          {!location.pathname.startsWith('/quiz-starting') && 
           !location.pathname.startsWith('/number-of-questions') && 
           <Navbar />}
          
          <Routes>
            {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfileView />} />

        {/* Exam Related */}
        <Route path="/exam-pattern" element={<ExamPattern />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/about-exam" element={<AboutExam />} />
        <Route path="/exam-notices" element={<ExamNotices />} />
        <Route path="/:pdf-viewer/:pdfPath/:type" element={<PDFViewer />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/form" element={<FormComponent />} />


        {/* payments */}
        <Route path="/:payment/:pdfPath/:price/:type" element={<Payment />} />


        {/* Syllabus */}
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/syllabus/mathematics" element={<SyllabusMath />} />
        <Route path="/syllabus/physics" element={<SyllabusPhys />} />
        <Route path="/syllabus/chemistry" element={<SyllabusChem />} />
        <Route path="/syllabus/biology" element={<SyllabusBio />} />

        {/* Formulas */}
        <Route path="/formulas" element={<Formulas />} />
        <Route path="/formulas/mathematics" element={<FormulaMathTopics />} />
        <Route path="/formulas/physics" element={<FormulaPhysTopics />} />
        <Route path="/formulas/chemistry" element={<FormulaChemTopics />} />
        <Route path="/formulas/biology" element={<FormulaBioTopics />} />

        {/* Notes */}
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/mathematics" element={<NoteMathTopics />} />
        <Route path="/notes/physics" element={<NotePhysTopics />} />
        <Route path="/notes/chemistry" element={<NoteChemTopics />} />
        <Route path="/notes/biology" element={<NoteBioTopics />} />

        {/* Practice Questions */}
        <Route path="/practice-questions" element={<PracticeQuestions />} />
        <Route path="/practice-questions/mathematics" element={<PracticeQuestionsMathTopics />} />
        <Route path="/practice-questions/physics" element={<PracticeQuestionsPhysTopics />} />
        <Route path="/practice-questions/chemistry" element={<PracticeQuestionsChemTopics />} />
        <Route path="/practice-questions/biology" element={<PracticeQuestionsBioTopics />} />

        {/* Previous Year Questions */}
        <Route path="/previous-year-questions" element={<PreviousYearQuestions />} />
        <Route path="/previous-year-questions/mathematics" element={<PreviousYearQuestionsMathTopics />} />
        <Route path="/previous-year-questions/physics" element={<PreviousYearQuestionsPhysTopics />} />
        <Route path="/previous-year-questions/chemistry" element={<PreviousYearQuestionsChemTopics />} />
        <Route path="/previous-year-questions/biology" element={<PreviousYearQuestionsBioTopics />} />

        {/* Books */}
        <Route path="/books" element={<Books />} />
        <Route path="/book/book1" element={<Books1 />} />
        <Route path="/book/book1/mathematics" element={<Book1MathTopics />} />
        <Route path="/book/book1/physics" element={<Book1PhysicsTopics />} />
        <Route path="/book/book1/chemistry" element={<Book1ChemistryTopics />} />
        <Route path="/book/book1/biology" element={<Book1BiologyTopics />} />
        <Route path="/book/book2" element={<Book2 />} />
        <Route path="/book/book2/mathematics" element={<Book2MathTopics />} />
        <Route path="/book/book2/physics" element={<Book2PhysicsTopics />} />
        <Route path="/book/book2/chemistry" element={<Book2ChemistryTopics />} />
        <Route path="/book/book2/biology" element={<Book2BiologyTopics />} />
        <Route path="/book/book3" element={<Book3 />} />
        <Route path="/book/book3/mathematics" element={<Book3MathTopics />} />
        <Route path="/book/book3/physics" element={<Book3PhysicsTopics />} />
        <Route path="/book/book3/chemistry" element={<Book3ChemistryTopics />} />
        <Route path="/book/book3/biology" element={<Book3BiologyTopics />} />
        <Route path="/book/book4" element={<Book4 />} />
        <Route path="/book/book4/mathematics" element={<Book4MathTopics />} />
        <Route path="/book/book4/physics" element={<Book4PhysicsTopics />} />
        <Route path="/book/book4/chemistry" element={<Book4ChemistryTopics />} />
        <Route path="/book/book4/biology" element={<Book4BiologyTopics />} />

        {/* Class Videos */}
        <Route path="/class" element={<Class />} />
        <Route path="/class/mathematics" element={<ClassMathTopics />} />
        <Route path="/class/physics" element={<ClassPhysicsTopics />} />
        <Route path="/class/chemistry" element={<ClassChemistryTopics />} />
        <Route path="/class/biology" element={<ClassBiologyTopics />} />
        <Route path="/class-video/:type/:subject/:topic/:name" element={<ClassVideo />} />
        <Route path="/class-video-view/:type/:subject/:topic/:name/:videoId" element={<ClassVideoview />} />

        {/* Quiz Routes (no navbar) */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/mathematics" element={<QuizMathTopics />} />
        <Route path="/quiz/physics" element={<QuizPhysicsTopics />} />
        <Route path="/quiz/chemistry" element={<QuizChemistryTopics />} />
        <Route path="/quiz/biology" element={<QuizBiologyTopics />} />
        <Route path="/quiz-starting/:type/:subject/:topic/:quizNo/:quesNum/:subjectName" element={<QuizStarting />} />
        <Route path="/quiz-details/:quizId" element={<QuizDetailsPage />} />
        <Route path="/quiz-number/:type/:subject/:topic/:subjectName" element={<QuizNumber />} />
        <Route path="/number-of-questions/:type/:subject/:topic/:quizNo/:subjectName" element={<NumberOfQuestions />} />

          </Routes>
        </>
      )}
    </>
  );
};

export default App;
