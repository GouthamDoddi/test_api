import express from 'express';
import { createStudent, deleteStudent, getAllStudents, updateStudent } from '../controllers/student.js';
import { addSubject, deleteSubject, getAllSubjects, updateSubject } from '../controllers/subject.js';

const router = express.Router();

router.post('/add_student', createStudent);
router.get('/get_students', getAllStudents);
router.post('/delete_student', deleteStudent);
router.post('/update_student', updateStudent);


router.post('/add_subject', addSubject);
router.post('/update_subject', updateSubject);
router.post('/delete_subject', deleteSubject);
router.get('/get_subjects', getAllSubjects);


export default router;
