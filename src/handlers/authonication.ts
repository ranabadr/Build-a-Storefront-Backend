import express, { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET as Secret);
        next();
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default verifyAuthToken;