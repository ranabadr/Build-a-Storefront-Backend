import supertest from 'supertest';
import orderRoutes from '../../handlers/orders';
import app from '../../server';

const req = supertest(app);

describe('Test endpoints', () => {
    beforeAll(async () => {
        const token = await req.post("/users").send({
            id: 1,
            firstName: "Rana",
            lastName: "Badr",
            password: "password"
          });
      });
    
    it('Get the orders endpoint', async () => {
        const res = await req.get('/orders')
        .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M');
        expect(res.status).toBe(200);
    })

    it('Get the orders/1 endpoint', async () => {
        const res = await req.get('/orders/1')
        .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M');
        expect(res.status).toBe(200);
    })

    it('Get the orders/id/products endpoint', async () => {
        const createProduct = await req.post('/products').send({
            id:1,
            name: "T-shirt",
            price: 500,
            category: "sporty"
        })
        .set(`Authorization`, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M`);
      
        const createOrder = await req.post('/orders').send({
          id: 1,
          status: "active",
        })
        .set(`Authorization`, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M`);

        const res = await req.get('/orders/1/products')
        .set("Authorization", `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M`);
        expect(res.status).toBe(200);
    })
})