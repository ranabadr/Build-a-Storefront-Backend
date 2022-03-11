import supertest from 'supertest';
import productRoutes from '../../handlers/products';
import { Product, ProductStore } from '../../models/product';
import app from '../../server';

const store = new ProductStore();

const req = supertest(app);

describe('Test Product endpoints', () => {
    it('Get the products endpoint', async () => {
        const res = await req.get('/products');
        expect(res.status).toBe(200);
    });

    it('Get the products/:id endpoint', async () => {
        const res = await req.get('/products/:id');
        expect(res.status).toBe(200);
    });

    it('create method should add a product', async () => {
        const token = await req.post('/users').send({
            firstname: 'salma',
            lastname: 'badr',
            password: 'pass123',
        });
        const response = await req
            .post('/products')
            .send({
                name: 'T-shirt',
                price: 500,
                category: 'sporty',
            })
            .set(`Authorization`, 'Bearer ' +  token);
    });
});
