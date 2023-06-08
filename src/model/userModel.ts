import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
  isAdminApproved: boolean;
  createAt?: Date;
  updateAt?: Date;
}

const isPasswordAndConfirmPasswordIsSame = function (
  this: IUser,
  confirmPassword: string
) {
  return this.password === confirmPassword;
};

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, 'Please provide your id'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: isPasswordAndConfirmPasswordIsSame,
        message: 'confirm password did not match with your password',
      },
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
    },
    role: {
      type: String,
      enum: {
        values: ['teacher', 'driver'],
        message: 'role only be teacher or driver',
      },
    },
    isAdminApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
