import React from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css'; // Reuse or modify CSS

import {
  FaUsers,
  FaBoxes,
  FaShoppingBag,
  FaUserGraduate,
  FaFilePdf,
  FaChartLine,
  FaCog,
  FaDatabase,
  FaClipboardCheck,
  FaBook,
  FaFileAlt,
  FaInfoCircle
} from 'react-icons/fa';

function AdminHome() {
  const adminOptions = [
    { id: 1, name: 'Users', icon: <FaUsers size={32} />, color: '#3498db', path: '/admin/users' },
    { id: 2, name: 'Inventory', icon: <FaBoxes size={32} />, color: '#2ecc71', path: '/admin/inventory' },
    { id: 3, name: 'Products', icon: <FaShoppingBag size={32} />, color: '#e74c3c', path: '/admin/products' },
    { id: 4, name: 'Students', icon: <FaUserGraduate size={32} />, color: '#9b59b6', path: '/admin/student' },
    { id: 5, name: 'PDFs', icon: <FaFilePdf size={32} />, color: '#f39c12', path: '/admin/pdf' },
    { id: 6, name: 'My Data', icon: <FaDatabase size={32} />, color: '#1abc9c', path: '/admin/mydata' },
    { id: 7, name: 'Analytics', icon: <FaChartLine size={32} />, color: '#34495e', path: '/admin/analytics' },
    { id: 8, name: 'Settings', icon: <FaCog size={32} />, color: '#7f8c8d', path: '/admin/settings' },
    { id: 9, name: 'Books', icon: <FaBook size={32} />, color: '#d35400', path: '/books' },
    { id: 10, name: 'Notes', icon: <FaFileAlt size={32} />, color: '#27ae60', path: '/notes' },
    { id: 11, name: 'Reports', icon: <FaClipboardCheck size={32} />, color: '#8e44ad', path: '/admin/reports' },
    { id: 12, name: 'Help', icon: <FaInfoCircle size={32} />, color: '#c0392b', path: '/admin/help' }
  ];

  return (
    <div className="admin-home">
     

      <div className="study-grid">
        {adminOptions.map((option) => (
          <Link
            to={option.path}
            key={option.id}
            className="study-card-link"
          >
            <div
              className="study-card"
              style={{ backgroundColor: option.color }}
            >
              <div className="card-icon">{option.icon}</div>
              <h3>{option.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;