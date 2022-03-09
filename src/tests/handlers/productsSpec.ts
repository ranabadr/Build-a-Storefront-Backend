import supertest from 'supertest';
import productRoutes from '../../handlers/products';
import { Product, ProductStore } from '../../models/product';
import app from '../../server'

const store = new ProductStore()

const req = supertest(productRoutes);
const request = supertest(app);

describe('Test endpoints', () => {
    it('Get the products endpoint', async () => {
        const res = await req.get('/products');
        expect(res.status).toBe(200);
    })

    it('Get the products/:id endpoint', async () => {
        const res = await req.get('/products/:id');
        expect(res.status).toBe(200);
    })

    it('create method should add a user', async () => {
        const token = await request.post("/users").send({
            firstName: "salma",
            lastName: "badr",
            password: "pass123"
        });
        const response = await request.post('/products').send({
            name: "T-shirt",
            price: 500,
            category: "sporty"
        })
        .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1NSwiZmlyc3RuYW1lIjoic2FsbWEiLCJsYXN0bmFtZSI6ImJhZHIiLCJwYXNzd29yZCI6InBhc3MxMjMifSwiaWF0IjoxNjQ2ODM1MTc1fQ.B9clGCUFww18US0TXNKogleWTJQ0hmrLUpjID7uHHTQ')
    });
})