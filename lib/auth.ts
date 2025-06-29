import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// In production, use environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Default admin users (in production, store in database)
const ADMIN_USERS = [
  { username: 'גבאי1', password: '$2a$10$...' }, // Pre-hashed passwords
  { username: 'גבאי2', password: '$2a$10$...' }
];

export const verifyPassword = async (username: string, password: string): Promise<boolean> => {
  // For demo purposes, use simple password check
  // In production, use proper hashing
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
