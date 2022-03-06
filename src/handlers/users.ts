import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
      const authorizationHeader = req.headers.authorization as string;
      const token = authorizationHeader;
      jwt.verify(token, process.env.TOKEN_SECRET as string);
      next();
    } catch (error) {
      res.status(401).json('Access denied, invalid token');
    }
  };
  

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
   const users = await store.show(req.body.id)
   res.json(users)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id:req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }

        const newUser = await store.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', verifyAuthToken, create)
  app.delete('/users', verifyAuthToken, destroy)
}

export default userRoutes;