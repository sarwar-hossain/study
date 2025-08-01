// src/components/Profile/Profile.js
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get-user", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch user data");
        setUserName(data.user.name);
        setPhone(data.user.phone);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to logout");
      alert("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { userName, phone, handleLogout };
};

export default UserProfile;