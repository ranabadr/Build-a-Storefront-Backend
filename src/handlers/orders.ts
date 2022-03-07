import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import jwt, { Secret } from 'jsonwebtoken';

const store = new OrderStore();

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader;
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    next();
  } catch(err) {
    res.status(400)
    res.json(err)
  }
};


const index = async (_req: Request, res: Response) => {
  try{
    const orders = await store.index()
    res.json(orders)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
   try {
    const orders = await store.show(req.body.id)
    res.json(orders)
   } catch(err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id:req.body.id,
            status: req.body.status,
            user_id: req.body.user_id
        }

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id)
    res.json(deleted)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (req: Request, res:Response) => {
    const orderId: string = req.params.id
    const productId: string = req.body.productId
    const quantity: number = parseInt(req.body.quantity)

    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch(err){
        res.status(400)
        res.json(err)
    }
}


const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, show)
  app.post('/orders', verifyAuthToken, create)
  app.delete('/orders', verifyAuthToken, destroy)
  app.post('/orders/:id/products', verifyAuthToken, addProduct)
}

export default orderRoutes;