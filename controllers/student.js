import { ObjectId } from 'mongodb';
import db from '../config/db.js';
import { OPERATION_FAILED, OPERATION_SUCCESS } from '../functions/response.js';
import { getSubjectsByIds as getAllSubjects } from './subject.js';

const student = db.collection('student');

export const createStudent = async (req, res) => {

    try {
        const { name, subjectKeys, grades } = req.body;

        const remarks = [];

        const subjects = await getAllSubjects(subjectKeys);

        console.log(subjects);

        let overallRemark = 'PASS';

        for (let i=0; i<subjects.length; i++) {
        
            if (grades[i] < 75) {
                remarks.push('FAIL');
                overallRemark = 'FAIL';
            } else {
                remarks.push('PASS');
            }
        }

        const result = await student.insertOne({ Student_name: name, Overall_remark: overallRemark, Subject_key: subjectKeys, Grade: grades, Remarks: remarks });

        return res.status(200).json(OPERATION_SUCCESS("Student record created successfully"))

    } catch (err) {
        return res.status(400).json(OPERATION_FAILED("Student record created unsuccessfully"))

    };
}

export const updateStudent = async (req, res) => {
    // read sudent data from req.body and update
    try {
        const { id, name, subjectKeys, grades } = req.body;

        const remarks = [];
        const subjects = await getAllSubjects(subjectKeys);

        let overallRemark = 'PASS';

        for (let i=0; i<subjects.length; i++) {
        
            if (grades[i] < 75) {
                remarks.push('FAIL');
                overallRemark = 'FAIL';
            } else {
                remarks.push('PASS');
            }
        }

        const result = await student.updateOne({ _id: ObjectId(id) }, { $set: { Student_name: name, Subject_key: subjectKeys, Overall_remark: overallRemark, Grade: grades, Remarks: remarks } });

        return res.status(200).json(OPERATION_SUCCESS("Student record updated successfully"))
        
    } catch (err) {
        return res.status(400).json(OPERATION_FAILED("Student record updated unsuccessfully"))
    }
}

export const deleteStudent = async (req, res) => {
    console.log('here')

    // read sudent data from req.body and delete
    try {
        const { id } = req.body;
        console.log(id);

        const result = await student.deleteOne({ _id: ObjectId(id) });
        console.log('not here');
        console.log(result);

        return res.status(200).json(OPERATION_SUCCESS("Student record deleted successfully"))
        
    } catch (err) {
        return res.status(400).json(OPERATION_FAILED("Student record deleted unsuccessfully"))
    }
}

export const getAllStudents = async (req, res) => {
    // read sudent data from req.body and delete
    try {
        const result = await student.find().toArray();

        return res.status(200).json(OPERATION_SUCCESS('', result))
        
    } catch (err) {
        console.log(err)
        return res.status(400).json(OPERATION_FAILED('', err.message))
    }
}


