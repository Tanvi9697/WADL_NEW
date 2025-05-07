const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Student = require('./model/student.js');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Set EJS view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/students')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Initialize student data
const initialStudent = async () => {
    try {
        const total = await Student.countDocuments();
        const data = [
            { Name: 'Purav', Roll_No: 22, WAD_Marks: 40, DSBDA_Marks: 45, CNS_Marks: 42, CC_Marks: 48, AI_Marks: 35 },
            { Name: 'Rahim', Roll_No: 25, WAD_Marks: 35, DSBDA_Marks: 47, CNS_Marks: 49, CC_Marks: 31, AI_Marks: 39 },
            { Name: 'John', Roll_No: 66, WAD_Marks: 50, DSBDA_Marks: 43, CNS_Marks: 17, CC_Marks: 22, AI_Marks: 40 },
            { Name: 'Aarav', Roll_No: 12, WAD_Marks: 48, DSBDA_Marks: 49, CNS_Marks: 50, CC_Marks: 45, AI_Marks: 46 },
            { Name: 'Meera', Roll_No: 35, WAD_Marks: 25, DSBDA_Marks: 15, CNS_Marks: 28, CC_Marks: 32, AI_Marks: 29 },
            { Name: 'Nina', Roll_No: 39, WAD_Marks: 30, DSBDA_Marks: 33, CNS_Marks: 27, CC_Marks: 38, AI_Marks: 41 },
            { Name: 'Ravi', Roll_No: 41, WAD_Marks: 38, DSBDA_Marks: 50, CNS_Marks: 45, CC_Marks: 40, AI_Marks: 42 },
            { Name: 'Dev', Roll_No: 18, WAD_Marks: 28, DSBDA_Marks: 20, CNS_Marks: 33, CC_Marks: 26, AI_Marks: 25 },
            { Name: 'Sara', Roll_No: 27, WAD_Marks: 45, DSBDA_Marks: 44, CNS_Marks: 46, CC_Marks: 48, AI_Marks: 49 },
            { Name: 'Kabir', Roll_No: 52, WAD_Marks: 20, DSBDA_Marks: 22, CNS_Marks: 19, CC_Marks: 15, AI_Marks: 18 }
        ];
        if (total === 0) {
            await Student.insertMany(data);
            console.log("Initial data inserted");
        }
    } catch (err) {
        console.error("Error initializing data:", err);
    }
};
initialStudent();

// List all students
app.get('/', async (req, res) => {
    try {
        const total = await Student.countDocuments();
        const student = await Student.find();
        res.render('index', { total, student, filter: 'All Students' });
    } catch (err) {
        res.status(500).send("Error fetching students: " + err.message);
    }
});

// Students with DSBDA > 20
app.get('/dsbda', async (req, res) => {
    try {
        const student = await Student.find({ DSBDA_Marks: { $gt: 20 } });
        res.render('index', { total: student.length, student, filter: 'DSBDA > 20' });
    } catch (err) {
        res.status(500).send("Error fetching DSBDA students: " + err.message);
    }
});

// Students with WAD and DSBDA < 40
app.get('/less', async (req, res) => {
    try {
        const student = await Student.find({
            WAD_Marks: { $lt: 40 },
            DSBDA_Marks: { $lt: 40 }
        });
        res.render('index', { total: student.length, student, filter: 'WAD & DSBDA < 40' });
    } catch (err) {
        res.status(500).send("Error fetching low marks students: " + err.message);
    }
});

// Students with all subjects > 25
app.get('/all', async (req, res) => {
    try {
        const student = await Student.find({
            WAD_Marks: { $gt: 25 },
            DSBDA_Marks: { $gt: 25 },
            CNS_Marks: { $gt: 25 },
            CC_Marks: { $gt: 25 },
            AI_Marks: { $gt: 25 }
        });
        res.render('index', { total: student.length, student, filter: 'All Subjects > 25' });
    } catch (err) {
        res.status(500).send("Error fetching high marks students: " + err.message);
    }
});

// Update marks via form
app.post('/update', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).send("Name is required");
        const result = await Student.updateOne({ Name: name }, {
            $inc: { WAD_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, CC_Marks: 10, AI_Marks: 10 }
        });
        if (result.matchedCount === 0) return res.status(404).send("Student not found");
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error updating student: " + err.message);
    }
});

// Delete student
app.get('/delete/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const result = await Student.deleteOne({ Name: name });
        if (result.deletedCount === 0) return res.status(404).send("Student not found");
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error deleting student: " + err.message);
    }
});

// 404 route
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
app.listen(3000, () => {
    console.log("Listening at http://localhost:3000");
});