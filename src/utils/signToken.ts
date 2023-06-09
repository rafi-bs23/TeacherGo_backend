import jwt from 'jsonwebtoken';

export const signToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  return token;
};
