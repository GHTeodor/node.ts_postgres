import { Schema, model, Types } from 'mongoose';

import { teacherModel } from './teacher';

const studentSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    age: {
        type: Number,
        default: 18,
    },
    teacher: {
        type: Types.ObjectId,
        ref: teacherModel,
        default: null,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

studentSchema.virtual('fullName').get(function () {
    return `${this.name}_${this.age}`;
});

// studentSchema.pre('find', function () {
//     this.populate(['teacher']);
// });

export const studentModel = model('student', studentSchema);
