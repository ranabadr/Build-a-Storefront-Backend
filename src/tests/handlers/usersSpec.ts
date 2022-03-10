import supertest from 'supertest';
import userRoutes from '../../handlers/users';
import { User, UserStore } from '../../models/user';
import app from '../../server';

const store = new UserStore()

const req = supertest(app);

describe('Test endpoints', () => {
    it('Get the users endpoint', async () => {
      const token = await req.post("/users").send({
        id: 1,
        firstName: "Rana",
        lastName: "Badr",
        password: "password"
      });
        const res = await req.get('/users')
        .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M');
        expect(res.status).toBe(200);
    });

    it('Get the users/:1 endpoint', async () => {
      const token = await req.post("/users").send({
        id: 1,
        firstName: "Rana",
        lastName: "Badr",
        password: "password"
      });
        const res = await req.get('/users/:1')
        .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M');
        expect(res.status).toBe(200);
    });

    it('create method should add a user', async () => {
       const result = await req.post("/users").send({
        id: 1,
        firstName: "Rana",
        lastName: "Badr",
        password: "password"
      });
      
      expect(result.status).toBe(200) 
    });    
});