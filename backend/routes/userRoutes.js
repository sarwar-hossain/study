const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./../models');

// Fetch Users
router.get('/login', async (req, res) => {
    try {
        const LoginDataList = await User.find();
        res.json(LoginDataList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users collection' });
    }
});

// Route to fetch user data
router.get("/get-user", async (req, res) => {
    try {
        const userPhone = req.cookies.userPhone; // Changed from userEmail to userPhone

        if (!userPhone) {
            return res.status(401).json({ error: "Not logged in" });
        }

        const user = await User.findOne({ phone: userPhone });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Set cookie with phone
        res.cookie("userPhone", user.phone, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to login" });
    }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: "Phone number already exists" });
    }

    // Temporary fix - add a dummy email
    const newUser = new User({ 
      name, 
      phone, 
      password: await bcrypt.hash(password, 10),
      email: `${phone}@dummy.com`  // Creates a unique email from phone
    });
    
    await newUser.save();
    res.json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
    try {
        res.clearCookie("userPhone", { // Changed from userEmail to userPhone
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ error: "Failed to logout" });
    }
});

router.delete('/login/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log('Deleting user with ID:', itemId);

        if (!itemId || itemId.length !== 24) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const deletedItem = await User.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', deletedItem });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;