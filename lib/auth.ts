import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

export const verifyPassword = async (username: string, password: string): Promise<boolean> => {
  return (username === 'גבאי1' && password === 'password1') || 
         (username === 'גבאי2' && password === 'password2');
};

export const generateToken = (username: string): string => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): { username: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { username: string };
  } catch {
    return null;
  }
};
