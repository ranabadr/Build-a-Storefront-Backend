import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch(err) {
    res.status(400)
    res.json(err)
}
}

const show = async (req: Request, res: Response) => {
   try {
    const products = await store.show(req.body.id)
    res.json(products)
   } catch(err) {
    res.status(400)
    res.json(err)
}
}

const create = async (req: Request, res: Response) => {
    try{
        jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
    } catch(err) {
        res.status(401);
        res.json(`invalid token ${err}`);
        return
    }
    
    try {
        const product: Product = {
            id:req.body.id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {

    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
  app.delete('/products', destroy)
}

export default productRoutes;