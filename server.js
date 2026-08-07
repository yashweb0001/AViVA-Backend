const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Inquiry = require('./models/Inquiry');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Frontend Files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection (Local MongoDB or Atlas)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coaching_db';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch((err) => console.log('DB Connection Error:', err));

// API Routes
// 1. Submit Inquiry Form
app.post('/api/inquiry', async (req, res) => {
    try {
        const { name, phone, studentClass, message } = req.body;
        const newInquiry = new Inquiry({ name, phone, studentClass, message });
        await newInquiry.save();
        res.status(201).json({ success: true, message: 'Inquiry submitted successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Get All Inquiries (For Admin Panel)
app.get('/api/inquiries', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));