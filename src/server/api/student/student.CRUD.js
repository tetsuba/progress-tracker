const mongoose = require('mongoose');
require('./student.modal');
const Student = mongoose.model('student');

function findAllStudents() {
    return Student.find({})
}

async function getStudentById(data) {
    const std = await Student.findOne({_id: data.id});
    return std;
}

async function createNewStudent(data) {
    const student = await Student.findOne({ firstName: data.firstName});

    if(student) {
        // TODO: how to handle this error better.
        return new Error('Student exists')
    }
    const newStudent = await Student.create(data);
    return { ...newStudent, id: newStudent._id };
}


module.exports = {
    findAllStudents,
    createNewStudent,
    getStudentById,
};
