import type { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';

export class AuthMiddleware {
  static async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          message: 'Unauthorized: Missing or invalid authorization header',
        });
      }

      const token = authHeader.split('Bearer ')[1];

      if (!token) {
        return res.status(401).json({
          message: 'Unauthorized: Token not provided',
        });
      }

      const decodedToken = await admin.auth().verifyIdToken(token);

      req.user = decodedToken;

      next();
    } catch {
      return res.status(403).json({
        message: 'Forbidden: Invalid or expired token',
      });
    }
  }
}
