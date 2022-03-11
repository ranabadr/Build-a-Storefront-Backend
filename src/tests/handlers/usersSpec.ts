import supertest from 'supertest';
import userRoutes from '../../handlers/users';
import { User, UserStore } from '../../models/user';
import app from '../../server';

const store = new UserStore();

const req = supertest(app);

describe('Test User endpoints', () => {
    let token = '';

    it('create method should add a user', async () => {
        const result = await req.post('/users').send({
            firstname: 'Rana',
            lastname: 'Badr',
            password: 'password',
        });

        token = result.body.token as unknown as string;

        expect(result.status).toBe(200);
    });

    it('Get all users endpoint', async () => {
        const res = await req
            .get('/users')
            .set(`Authorization`, 'Bearer ' +  token);
        expect(res.status).toBe(200);
    });

    it('Get the users/:id endpoint', async () => {
        const res = await req
            .get('/users/:1')
            .set(`Authorization`, 'Bearer ' +  token);
        expect(res.status).toBe(200);
    });
});
