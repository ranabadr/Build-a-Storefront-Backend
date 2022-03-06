import supertest from 'supertest';
import userRoutes from '../../handlers/users';

const req = supertest(userRoutes);

describe('Test endpoints', () => {
    it('Get the users endpoint', async (done) => {
        const res = await req.get('/users');
        expect(res.status).toBe(200);
        done();
    })

    it('Get the users/:id endpoint', async (done) => {
        const res = await req.get('/users/:id');
        expect(res.status).toBe(200);
        done();
    })
})