import supertest from 'supertest';
import userRoutes from '../../handlers/users';

const req = supertest(userRoutes);

describe('Test endpoints', () => {
    it('Get the users endpoint', async () => {
        const res = await req.get('/users');
        expect(res.status).toBe(200);
    })

    it('Get the users/:id endpoint', async () => {
        const res = await req.get('/users/:id');
        expect(res.status).toBe(200);
    })
})