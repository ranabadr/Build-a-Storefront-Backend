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
      user_id: 1,
    })
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNjQ2ODUwMDY2fQ.O-YO45zsBPAYN1HFfsAUQIbn2-aE0C0Jb8O6r8GWXhY')
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
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNjQ2ODUwMDY2fQ.O-YO45zsBPAYN1HFfsAUQIbn2-aE0C0Jb8O6r8GWXhY')
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
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNjQ2ODUwMDY2fQ.O-YO45zsBPAYN1HFfsAUQIbn2-aE0C0Jb8O6r8GWXhY')
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
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNjQ2ODUwMDY2fQ.O-YO45zsBPAYN1HFfsAUQIbn2-aE0C0Jb8O6r8GWXhY')
    expect(response.status).toBe(200)
  });

  it('addProduct method should work', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.post('orders/:id/products').send({
      quantity: 50,
      orderId: "1",
      productId: "1"
    })
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNjQ2ODUwMDY2fQ.O-YO45zsBPAYN1HFfsAUQIbn2-aE0C0Jb8O6r8GWXhY')
    expect(response.status).toBe(200)
  });
});