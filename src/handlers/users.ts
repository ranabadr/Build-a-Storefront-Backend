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
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  };
  

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
  res.json(users)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
   try {
    const users = await store.show(req.body.id)
    res.json(users)
   } catch (err) {
    res.status(400)
    res.json(err)
  }
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
    try {
      const deleted = await store.delete(req.body.id)
      res.json(deleted)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users', verifyAuthToken, destroy)
}

export default userRoutes;