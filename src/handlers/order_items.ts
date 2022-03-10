import { OrderItem, OrderItemStore } from '../models/order_item';
import express, { Request, Response } from 'express';

const store = new OrderItemStore();

const addProduct = async (req: Request, res:Response) => {
    const order_id: number = parseInt(req.params.id)
    const product_id: number = parseInt(req.params.id)
    const quantity: number = parseInt(req.body.quantity)
    const orderItem: OrderItem = { quantity, order_id, product_id }
    try {
      const newOrderProduct = await store.addProduct(orderItem)
      res.json(newOrderProduct)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
}