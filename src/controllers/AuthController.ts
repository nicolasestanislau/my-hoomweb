import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepository = getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ username, password: hashedPassword });
    await userRepository.save(user);
    res.status(201).json({ message: "User  registered" });
  }

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  }
}
