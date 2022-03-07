import supertest from 'supertest';
import productRoutes from '../../handlers/products';

const req = supertest(productRoutes);

describe('Test endpoints', () => {
    it('Get the products endpoint', async () => {
        const res = await req.get('/products');
        expect(res.status).toBe(200);
    })

    it('Get the products/:id endpoint', async () => {
        const res = await req.get('/products/:id');
        expect(res.status).toBe(200);
    })
})