import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken"; // Importa tudo como um namespace

// Substitua pela sua chave secreta real
const JWT_SECRET = "your_jwt_secret";

interface CustomRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.id;
    next();
  });
};
