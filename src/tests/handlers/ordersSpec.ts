import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);

describe('Test Order endpoints', () => {
    let orderId = 0;
    let productId = 0;
    let token = '';
    let userId = 0;
    beforeAll(async () => {
        const res = await req.post('/users').send({
            firstname: 'Rana',
            lastname: 'Badr',
            password: 'password',
        });

        token = res.body.token as unknown as string;
        userId = res.body.id as unknown as number;

        const resP = await req
            .post('/products')
            .send({
                name: 'T-shirt',
                price: 500,
                category: 'sporty',
            })
            .set(`Authorization`, 'Bearer ' + token);

        productId = resP.body.id as unknown as number;
    });

    it('Create new order endpoint', async () => {
        const resOrder = await req
            .post('/orders')
            .send({
                status: 'active',
                user_id: userId,
            })
            .set(`Authorization`, 'Bearer ' +  token);

        orderId = resOrder.body.id as unknown as number;

        const res = await req
            .post('/orders/' + orderId + '/products')
            .send({
                quantity: 50,
                product_id: productId,
            })
            .set(`Authorization`, 'Bearer ' +  token);

        expect(res.status).toBe(200);
        expect(res.body.product_id).toBe(productId);
    });

    it('Get the orders endpoint', async () => {
        const res = await req.get('/orders').set(`Authorization`, 'Bearer ' +  token);
        expect(res.status).toBe(200);
    });

    it('Get the orders/:id endpoint', async () => {
        const res = await req
            .get('/orders/' + orderId)
            .set(`Authorization`, 'Bearer ' +  token);
        expect(res.status).toBe(200);
    });
});
