import supertest from 'supertest';
import orderRoutes from '../../handlers/orders';

const req = supertest(orderRoutes);

describe('Test endpoints', () => {
    it('Get the orders endpoint', async (done) => {
        const res = await req.get('/orders');
        expect(res.status).toBe(200);
        done();
    })

    it('Get the orders/:id endpoint', async (done) => {
        const res = await req.get('/orders/:id');
        expect(res.status).toBe(200);
        done();
    })

    it('Get the orders/:id/products endpoint', async () => {
        const res = await req.get('/orders/:id/products');
        expect(res.status).toBe(200);
    })
})