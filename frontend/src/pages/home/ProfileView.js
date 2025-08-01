// src/components/Profile/ProfileView.js
import React from "react";
import "./../../pagescss/Profile.css";
import UserProfile from "../Database/UserProfile";

const ProfileView = () => {

  const { userName, phone, handleLogout } = UserProfile();

  return (
    <div className="profile-container">
      <h2>Welcome to the Profile Page</h2>
      {userName && <p>Hello, {userName}!</p>}
      {phone && <p>Phone: {phone}</p>}
      {phone && (
        <button onClick={handleLogout} className="profile-logout-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default ProfileView;