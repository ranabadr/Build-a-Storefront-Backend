import express, { Request, Response, NextFunction } from 'express';
import { Order, OrderStore } from '../models/order';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from './authonication';

dotenv.config();

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const orders = await store.show(req.body.id);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            status: req.body.status as unknown as string,
            user_id: req.body.user_id as unknown as number,
        };

        const newOrder = await store.create(order);
        res.json(newOrder);
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

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.delete('/orders', verifyAuthToken, destroy);
};

export default orderRoutes;