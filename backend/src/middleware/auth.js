import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET || 'super-secret-key';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(`[AUTH] Path: ${req.path}, Header: ${authHeader ? 'Present' : 'Missing'}`);

    if (!authHeader) {
        console.warn(`[AUTH] No authorization header found for ${req.path}`);
        return res.status(401).json({ 
            message: 'No token provided', 
            receivedHeaders: req.headers,
            debugInfo: 'Auth header is missing'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.warn(`[AUTH] No token found in authorization header for ${req.path}`);
        return res.status(401).json({ 
            message: 'No token provided',
            receivedHeaders: req.headers,
            debugInfo: 'Token part of header is missing'
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.admin = decoded;
        console.log(`[AUTH] Success: ${decoded.role}`);
        next();
    } catch (err) {
        console.error(`[AUTH] Verification failed: ${err.message}`);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
