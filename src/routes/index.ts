import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { ProductController } from "../controllers/ProductController";
import { authMiddleware } from "../middleware/auth";
import multer from "multer";
import path from "path";

const router = Router();
const upload = multer({ dest: "src/uploads/" });

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/products", authMiddleware, ProductController.create);
router.get("/products", authMiddleware, ProductController.getAll);
router.put("/products/:id", authMiddleware, ProductController.update);
router.delete("/products/:id", authMiddleware, ProductController.delete);
router.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ url: fileUrl });
});

export default router;
