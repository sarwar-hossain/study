import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './style/AdminNavbar.css';
import UserProfile from '../Database/UserProfile';
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const { phone } = UserProfile();

  if (phone === "9339045904" || phone === "123451") {
   
  }else{
     navigate("/")
  }

  return (
   <div className="admin-container">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button
            className="mobile-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="sidebar-footer">
          <Link
            to="/admin"
            className={`nav-link ${isActive('/admin') && !isActive('/admin/') ? 'active' : ''}`}
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
          <Link
            to="/admin/class-video"
            className={`nav-link ${isActive('/admin/class-video') ? 'active' : ''}`}
          >
            <i className="fas fa-video"></i> Class Videos
          </Link>
          <Link
            to="/admin/questions"
            className={`nav-link ${isActive('/admin/questions') ? 'active' : ''}`}
          >
            <i className="fas fa-question-circle"></i> Quiz Questions
          </Link>
          <Link
            to="/admin/pdf"
            className={`nav-link ${isActive('/admin/pdf') ? 'active' : ''}`}
          >
            <i className="fas fa-file-pdf"></i> PDF Resources
          </Link>
          <Link
            to="/admin/payment-history"
            className={`nav-link ${isActive('/admin/payment-history') ? 'active' : ''}`}
          >
            <i className="fas fa-money-bill-wave"></i> Payments
          </Link>
          <Link
            to="/admin/users"
            className={`nav-link ${isActive('/admin/users') ? 'active' : ''}`}
          >
            <i className="fas fa-users"></i> User Manage
          </Link>

        </div>
      </div>

      {/* Right Content Area */}
      <div className="admin-content">
        <div className="content-header">
          <div className="header-left">
            {/* Only show this button when sidebar is closed on mobile */}
            {!sidebarOpen && (
              <button
                className="mobile-menu-btn"
                onClick={() => setSidebarOpen(true)}
              >
                <i className="fas fa-bars"></i>
              </button>
            )}
            <h3>{location.pathname.split('/').pop() || 'Dashboard'}</h3>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <span>Admin User</span>
              <div className="avatar">AU</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;