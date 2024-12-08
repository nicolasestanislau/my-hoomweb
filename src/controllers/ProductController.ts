import { Request, Response } from "express";
import getRepository from "typeorm";
import { Product } from "../entities/Product";

export class ProductController {
  static async create(req: Request, res: Response) {
    const { name, imageUrl } = req.body;
    const productRepository = getRepository(Product);
    const product = productRepository.create({ name, imageUrl });
    await productRepository.save(product);
    res.status(201).json(product);
  }

  static async getAll(req: Request, res: Response) {
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
    res.json(products);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, imageUrl } = req.body;
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.imageUrl = imageUrl;
    await productRepository.save(product);
    res.json(product);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const productRepository = getRepository(Product);
    const product = await productRepository.findOne(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productRepository.remove(product);
    res.status(204).send();
  }
}
