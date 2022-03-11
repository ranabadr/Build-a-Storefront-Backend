import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from './authonication';

dotenv.config();

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const products = await store.show(req.body.id);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };

        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products', verifyAuthToken, destroy);
};

export default productRoutes;
