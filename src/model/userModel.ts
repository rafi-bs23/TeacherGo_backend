import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
  routeId: string;
  isAdminApproved: boolean;
  isTeacherWillGo: boolean;
  isDriverOk: boolean;
  createAt?: Date;
  updateAt?: Date;
  comparePassword(candidPassword: string, hashPassword: string): boolean;
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

    routeId: {
      type: String,
      required: [true, 'A user must have a route id'],
    },
    isAdminApproved: {
      type: Boolean,
      default: false,
    },
    isTeacherWillGo: {
      type: Boolean,
      default: true,
    },
    isDriverOk: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password!, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  candidPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(candidPassword, hashPassword);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
