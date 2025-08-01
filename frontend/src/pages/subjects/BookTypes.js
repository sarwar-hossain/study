import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaBookOpen, FaBookReader, FaBookMedical } from 'react-icons/fa';
import './../../pagescss/Books.css';

function BookTypes() {
  // Array of books data with different colors and icons
  const books = [
    { id: 1, title: 'B1', path: '/book/book1', color: '#FF6B6B', icon: <FaBook size={32} /> },
    { id: 2, title: 'B2', path: '/book/book2', color: '#4ECDC4', icon: <FaBookOpen size={32} /> },
    { id: 3, title: 'B3', path: '/book/book3', color: '#45B7D1', icon: <FaBookReader size={32} /> },
    { id: 4, title: 'B4', path: '/book/book4', color: '#A5D8DD', icon: <FaBookMedical size={32} /> },
    { id: 5, title: 'B5', path: '/book/book1', color: '#FFA07A', icon: <FaBook size={32} /> },
    { id: 6, title: 'B6', path: '/book/book2', color: '#98D8C8', icon: <FaBookOpen size={32} /> },
    { id: 7, title: 'B7', path: '/book/book3', color: '#F06292', icon: <FaBookReader size={32} /> },
    { id: 8, title: 'B8', path: '/book/book4', color: '#7986CB', icon: <FaBookMedical size={32} /> },
  ];

  return (
    <div className="books-page">
      <header className="books-header">
        <h1>Our Book Collection</h1>
        <p>Select a book to explore</p>
      </header>
      
      <div className="books-grid">
        {books.map((book) => (
          <Link 
            to={book.path} 
            key={book.id} 
            className="book-card"
            style={{ backgroundColor: book.color }}
          >
            <div className="book-icon">{book.icon}</div>
            <h3 className="book-title">{book.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookTypes;