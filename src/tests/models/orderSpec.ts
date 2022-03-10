import supertest from 'supertest';
import { Order, OrderStore } from '../../models/order';
import app from '../../server';

const store = new OrderStore();

const request = supertest(app);

describe("Order Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a order', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.post('/orders').send({
      id: 1,
      status: "active",
    })
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M')
    expect(response.status).toBe(200)
  });

  it('index method should return a list of orders', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.get('/orders')
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M')
    expect(response.status).toBe(200)
  });

  it('show method should return the correct order', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.get('/orders/:id')
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M')
    expect(response.status).toBe(200)
  });

  it('delete method should remove the order', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.delete('/orders')
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M');
    expect(response.status).toBe(200)
  });

  it('addProduct method should work', async () => {
    const token = await request.post('/users').send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });

    const createProduct = await request.post('/products').send({
      id:1,
      name: "T-shirt",
      price: 500,
      category: "sporty"
  })
  .set(`Authorization`, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M`);

  const createOrder = await request.post('/orders').send({
    id: 1,
    status: "active",
  })
  .set(`Authorization`, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M`);

    const response = await request.post(`orders/1/products`).send({
      id:1,
      quantity: 50,
      order_id:1,
      product_id:1
    })
    .set(`Authorization`, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M`);
    expect(response.status).toBe(200)
  });
});