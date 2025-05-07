const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    CC_Marks: Number,
    AI_Marks: Number
}, { collection: 'studentmarks' });

module.exports = mongoose.model('Student', studentSchema);