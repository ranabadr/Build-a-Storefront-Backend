import supertest from 'supertest';
import productRoutes from '../../handlers/products';

const req = supertest(productRoutes);

describe('Test endpoints', () => {
    it('Get the products endpoint', async (done) => {
        const res = await req.get('/products');
        expect(res.status).toBe(200);
        done();
    })

    it('Get the products/:id endpoint', async (done) => {
        const res = await req.get('/products/:id');
        expect(res.status).toBe(200);
        done();
    })
})