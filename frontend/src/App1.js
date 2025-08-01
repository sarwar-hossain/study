import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MyDataPage from './pages/admin/MyDataPage';
import InventoryPage from './pages/admin/InventoryPage';
import AddInventory from './pages/admin/AddInventory';
import AddMydata from './pages/admin/AddMydata';
import ProductsPage from './pages/admin/ProductsPage';
import AddProducts from './pages/admin/AddProducts';
import UpdateInventoryPage from './pages/admin/UpdateInventoryPage';
import UpdateMydataPage from './pages/admin/UpdateMyDataPage';
import UpdateProductsPage from './pages/admin/UpdateProductsPage';
import Student from './pages/admin/Student';
import AddStudent from './pages/admin/AddStudent';
import UpdateStudent from './pages/admin/UpdateStudent';
import AddPdf from './pages/admin/AddPdf';
import Pdf from './pages/admin/Pdf';
import Users from './pages/admin/Users';
import AdminHome from './pages/admin/AdminHome';
import AdminNavbar from './pages/admin/AdminNavbar';
import AddBookPdf from './pages/admin/AddBookPdf';
import BookPdf from './pages/admin/BookPdf';
import AddClassVideo from './pages/admin/AddClassVideo';
import AdminClassVideo from './pages/admin/AddminClassVideo';
import AdminQuizQuestions from './pages/admin/AdminQuizQuestions';
import AddQuizQuestions from './pages/admin/AddQuizQuestions';


import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/home/Home';
import Navbar from './pages/home/Navbar';
import ProfileView from './pages/home/ProfileView';

import ExamPattern from './pages/pages/ExamPattern';
import StudyPlan from './pages/pages/StudyPlan';
import ExamNotices from './pages/pages/ExamNotices';
import AboutExam from './pages/pages/AboutExam';

import Syllabus from './pages/syllabus/Syllabus';
import SyllabusMath from './pages/syllabus/subjects/SyllabusMath';
import SyllabusPhys from './pages/syllabus/subjects/SyllabusPhys';
import SyllabusChem from './pages/syllabus/subjects/SyllabusChem';
import SyllabusBio from './pages/syllabus/subjects/SyllabusBio';


import PDFViewer from './pages/pages/PDFViewer';

import Formulas from './pages/formulas/Formulas';
import FormulaMathTopics from './pages/formulas/subjects/FormulaMathTopics';
import FormulaPhysTopics from './pages/formulas/subjects/FormulaPhysTopics';
import FormulaChemTopics from './pages/formulas/subjects/FormulaChemTopics';
import FormulaBioTopics from './pages/formulas/subjects/FormulaBioTopics';

import Notes from './pages/notes/Notes';
import NoteMathTopics from './pages/notes/subjects/NoteMathTopics';
import NoteChemTopics from './pages/notes/subjects/NoteChemTopics';
import NotePhysTopics from './pages/notes/subjects/NotePhysTopics';
import NoteBioTopics from './pages/notes/subjects/NoteBioTopics';

import PracticeQuestions from './pages/practicequestions/PracticeQuestions';
import PracticeQuestionsMathTopics from './pages/practicequestions/subjects/PracticeQuestionsMathTopics';
import PracticeQuestionsPhysTopics from './pages/practicequestions/subjects/PracticeQuestionsPhysTopics';
import PracticeQuestionsChemTopics from './pages/practicequestions/subjects/PracticeQuestionsChemTopics';
import PracticeQuestionsBioTopics from './pages/practicequestions/subjects/PracticeQuestionsBioTopics';

import PreviousYearQuestions from './pages/previousyearquestions/PreviousYearQuestions';
import PreviousYearQuestionsMathTopics from './pages/previousyearquestions/subjects/PreviousYearQuestionsMathTopics';
import PreviousYearQuestionsPhysTopics from './pages/previousyearquestions/subjects/PreviousYearQuestionsPhysTopics';
import PreviousYearQuestionsChemTopics from './pages/previousyearquestions/subjects/PreviousYearQuestionsChemTopics';
import PreviousYearQuestionsBioTopics from './pages/previousyearquestions/subjects/PreviousYearQuestionsBioTopics';

import Books from './pages/books/Books';
import BookView from './pages/pages/BookView';

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

import Class from './pages/class/Class';
import ClassMathTopics from './pages/class/class/ClassMathTopics';
import ClassPhysicsTopics from './pages/class/class/ClassPhysicsTopics';
import ClassChemistryTopics from './pages/class/class/ClassChemistryTopics';
import ClassBiologyTopics from './pages/class/class/ClassBiologyTopics';
import ClassVideo from './pages/pages/ClassVideo';
import ClassVideoview from './pages/pages/ClassVideoView';

import Quiz from './pages/quiz/Quiz';
import QuizMathTopics from './pages/quiz/subjects/QuizMathTopics';
import QuizPhysicsTopics from './pages/quiz/subjects/QuizPhysicsTopics';
import QuizChemistryTopics from './pages/quiz/subjects/QuizChemistryTopics';
import QuizBiologyTopics from './pages/quiz/subjects/QuizBiologyTopics';
import QuizQuestions from './pages/quiz/quiz/QuizQuestions';
import QuizStarting from './pages/quiz/quiz/QuizStarting';
import QuizDetailsPage from './pages/quiz/quiz/QuizDetailsPage';
import QuizNumber from './pages/quiz/quiz/QuizNumber';
import NumberOfQuestions from './pages/quiz/quiz/NumberOfQuestions';
import A from './pages/quiz/quiz/A';



const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// Create a new component to handle conditional rendering
const AppContent = () => {
  const location = useLocation();

  // Define an array of paths where AdminNavbar should be shown
  const adminPaths = [
    '/admin',
    '/admin/mydata',
    '/admin/inventory',
    '/admin/add-inventory',
    '/admin/add-mydata',
    '/admin/products',
    '/admin/student',
    '/admin/add-student',
    '/admin/add-products',
    '/admin/update/', // Consider more specific matching for update paths if needed
    '/admin/updatemydata/',
    '/admin/updateproducts/',
    '/admin/updateproduct/',
    '/admin/updatestudent/',
    '/admin/add-pdf',
    '/admin/pdf',
    '/admin/add-book-pdf',
    '/admin/book-pdf',
    '/admin/users',
    '/admin/class-video',
    '/admin/add-class-video',
  ];

  // Check if the current path starts with any of the admin paths
  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Show AdminNavbar only on admin routes */}
      {isAdminRoute && <AdminNavbar />}

      {/* Show Navbar on all non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfileView />} />

        <Route path="/exam-pattern" element={<ExamPattern />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/about-exam" element={<AboutExam />} />
        <Route path="/exam-notices" element={<ExamNotices />} />
        <Route path="/:pdf-viewer/:id" element={<PDFViewer />} />

        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/syllabus/mathematics" element={<SyllabusMath />} />
        <Route path="/syllabus/physics" element={<SyllabusPhys />} />
        <Route path="/syllabus/chemistry" element={<SyllabusChem />} />
        <Route path="/syllabus/biology" element={<SyllabusBio />} />

        <Route path="/formulas" element={<Formulas />} />
        <Route path="/formulas/mathematics" element={<FormulaMathTopics />} />
        <Route path="/formulas/physics" element={<FormulaPhysTopics />} />
        <Route path="/formulas/chemistry" element={<FormulaChemTopics />} />
        <Route path="/formulas/biology" element={<FormulaBioTopics />} />

        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/mathematics" element={<NoteMathTopics />} />
        <Route path="/notes/physics" element={<NotePhysTopics />} />
        <Route path="/notes/chemistry" element={<NoteChemTopics />} />
        <Route path="/notes/biology" element={<NoteBioTopics />} />

        <Route path="/practice-questions" element={<PracticeQuestions />} />
        <Route path="/practice-questions/mathematics" element={<PracticeQuestionsMathTopics />} />
        <Route path="/practice-questions/physics" element={<PracticeQuestionsPhysTopics />} />
        <Route path="/practice-questions/chemistry" element={<PracticeQuestionsChemTopics />} />
        <Route path="/practice-questions/biology" element={<PracticeQuestionsBioTopics />} />

        <Route path="/previous-year-questions" element={<PreviousYearQuestions />} />
        <Route path="/previous-year-questions/mathematics" element={<PreviousYearQuestionsMathTopics />} />
        <Route path="/previous-year-questions/physics" element={<PreviousYearQuestionsPhysTopics />} />
        <Route path="/previous-year-questions/chemistry" element={<PreviousYearQuestionsChemTopics />} />
        <Route path="/previous-year-questions/biology" element={<PreviousYearQuestionsBioTopics />} />


        <Route path="/:book-view/:id" element={<BookView />} />
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

        <Route path="/class" element={<Class />} />
        <Route path="/class/mathematics" element={<ClassMathTopics />} />
        <Route path="/class/physics" element={<ClassPhysicsTopics />} />
        <Route path="/class/chemistry" element={<ClassChemistryTopics />} />
        <Route path="/class/biology" element={<ClassBiologyTopics />} />
        <Route path="/class-video/:type/:subject/:topic" element={<ClassVideo />} />
        <Route path="/class-video-view/:type/:subject/:topic/:name/:videoId" element={<ClassVideoview />} />

        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/mathematics" element={<QuizMathTopics />} />
        <Route path="/quiz/physics" element={<QuizPhysicsTopics />} />
        <Route path="/quiz/chemistry" element={<QuizChemistryTopics />} />
        <Route path="/quiz/biology" element={<QuizBiologyTopics />} />
        <Route path="/quiz-questions/:type/:subject/:topic" element={<QuizQuestions />} />
        <Route path="/quiz-starting/:type/:subject/:topic/:quizNo/:quesNum/:subjectName" element={<QuizStarting />} />
        <Route path="/quiz-details/:quizId" element={<QuizDetailsPage />} />
        <Route path="/quiz-number/:type/:subject/:topic/:subjectName" element={<QuizNumber />} />
        <Route path="/number-of-questions/:type/:subject/:topic/:quizNo/:subjectName" element={<NumberOfQuestions />} />

        <Route path="/a" element={<A />} />




        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/mydata" element={<MyDataPage />} />
        <Route path="/admin/inventory" element={<InventoryPage />} />
        <Route path="/admin/add-inventory" element={<AddInventory />} />
        <Route path="/admin/add-mydata" element={<AddMydata />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/student" element={<Student />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/add-products" element={<AddProducts />} />
        <Route path="/admin/update/:id" element={<UpdateInventoryPage />} />
        <Route path="/admin/updatemydata/:id" element={<UpdateMydataPage />} />
        <Route path="/admin/updateproducts/:id" element={<UpdateProductsPage />} />
        <Route path="/admin/updateproduct/:id" element={<UpdateProductsPage />} />
        <Route path="/admin/updatestudent/:id" element={<UpdateStudent />} />
        <Route path="/admin/add-pdf" element={<AddPdf />} />
        <Route path="/admin/pdf" element={<Pdf />} />
        <Route path="/admin/add-book-pdf" element={<AddBookPdf />} />
        <Route path="/admin/book-pdf" element={<BookPdf />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/class-video" element={<AdminClassVideo />} />
        <Route path="/admin/add-class-video" element={<AddClassVideo />} />
        <Route path="/admin/questions" element={<AdminQuizQuestions />} />
        <Route path="/admin/add-questions" element={<AddQuizQuestions />} />


      </Routes>
    </>
  );
};

export default App;