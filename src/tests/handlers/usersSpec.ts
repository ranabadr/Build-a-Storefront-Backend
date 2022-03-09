import supertest from 'supertest';
import userRoutes from '../../handlers/users';
import { User, UserStore } from '../../models/user';

const store = new UserStore()

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

    it('create method should add a user', async () => {
       const result = await store.create({  
              id: 1,
              firstName: "Rana",
              lastName: "Badr",
              password: "password"
          });
            expect(result).toEqual({
              id: 1,
              firstName: "Rana",
              lastName: "Badr",
              password: "password"
            });
          });
        
})