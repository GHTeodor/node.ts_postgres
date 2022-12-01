import { Request, Response, NextFunction } from 'express';

import { studentModel } from '../mongo-models';

class StudentController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const students = await studentModel.find({}).populate(['teacher']);
            res.json(students);
        } catch (e) {
            next(e);
        }
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        try {
            const newStudent = await studentModel.create(req.body);
            // await teacherModel.create({
            //     name: 'Boris',
            //     age: 25,
            //     email: 'JohnsoniUK@ukr.net',
            // });

            res.json(newStudent);
        } catch (e) {
            next(e);
        }
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedStudent = await studentModel.findByIdAndUpdate(
                req.params.student_id,
                { teacher: req.body.teacher }, // add teacher (Id) to student
                { new: true },
            );
            res.json(updatedStudent);
        } catch (e) {
            next(e);
        }
    }
}

export const studentController = new StudentController();
