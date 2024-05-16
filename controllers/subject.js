import { ObjectId } from 'mongodb';
import db from '../config/db.js';
import { OPERATION_FAILED, OPERATION_SUCCESS } from '../functions/response.js';

const subject = db.collection('subject');


export const getSubjectsByIds = ( subjectIds ) => {
    try {

        const ids = [];

        subjectIds.forEach(id => {
            ids.push(ObjectId(id));
        });

        return subject.find({ _id: { $in: ids } }).toArray();
    } catch ( err ) {
        return OPERATION_FAILED(' ', err.message);
    }
}

export const getAllSubjects = async (req, res) => {


    try {
        const result = await subject.find({}).toArray();
        return res.status(200).json(OPERATION_SUCCESS('', result));

    } catch ( err ) {
        return res.status(500).json(OPERATION_FAILED(' ', err.message));
    
    }
}

export const addSubject = async (req, res) => {
    const { subjectName } = req.body;
    try {
        if (!subjectName)
            return res.status(400).json(OPERATION_FAILED('Please provide subject name', {}));
        const result = await subject.insertOne({ Subject_name: subjectName });
        return res.status(200).json(OPERATION_SUCCESS('', result));
        
    } catch ( err ) {
        return res.status(500).json(OPERATION_FAILED(' ', err.message));
    }
}

export const updateSubject = async (req, res) => {
    const { id } = req.body;
    const { subjectName } = req.body;

    try {
        if (!subjectName)
            return res.status(400).json(OPERATION_FAILED('Please provide subject name', {}));
        const result = await subject.updateOne({ _id: id }, { $set: { subjectName } });
        return res.status(200).json(OPERATION_SUCCESS('', result));
        
    } catch ( err ) {
        return res.status(500).json(OPERATION_FAILED(' ', err.message));
    }
}

export const deleteSubject = async (req, res) => {
    const { id } = req.body;

    try {
        if (!id)
            return res.status(400).json(OPERATION_FAILED('Please provide subject id', {}));
        const result = await subject.deleteOne({ _id: ObjectId(id) });
        return res.status(200).json(OPERATION_SUCCESS('', result));
    } catch ( err ) {
        return res.status(500).json(OPERATION_FAILED(' ', err.message));
    }
}

