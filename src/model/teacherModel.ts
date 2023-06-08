import mongoose, { Schema } from 'mongoose';

export interface ITeacher {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dept: string;
  phone: string;
  route: string;
  isTeacherWillUseTransport: boolean;
}

const comparePasswordAndComparePasswordInSchema = function (
  this: ITeacher,
  confirmPassword: string
): boolean {
  return this.password === confirmPassword;
};

const teacherSchema = new Schema({
  id: {
    type: String,
    required: [true, 'Teacher must have a Id'],
  },
  name: {
    type: String,
    required: [true, 'Teacher must have a name'],
  },
  email: {
    type: String,
    required: [true, 'Teacher must have a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Teacher must have a password'],
    minLength: [6, 'Password must be greater or equal then 6 character'],
    maxLength: [16, 'Password must be smaller or equal then 16 character'],
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: comparePasswordAndComparePasswordInSchema,
      message: 'Confirm password did not match',
    },
  },
});

const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);

export default Teacher;
