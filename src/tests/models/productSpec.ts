import supertest from 'supertest';
import { Product, ProductStore } from '../../models/product';
import dotenv from 'dotenv';
import app from '../../server'

dotenv.config();

const store = new ProductStore();

const request = supertest(app);

describe("Product Model", () => {
  const oldEnv = process.env.ENV;

  beforeAll(() => {
    process.env.ENV = 'test';
  }); 

  afterAll(()=> {
      process.env.ENV = oldEnv;
  });

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

  it('create method should add a product', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.post('/products').send({
        id:1,
        name: "T-shirt",
        price: 500,
        category: "sporty"
    })
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M')
    expect(response.status).toBe(200)
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id:1,
      name: "T-shirt",
      price: 500,
      category: "sporty"}] as unknown as Product[]);
  });

  it('show method should return the correct product', async () => {
    const result: Product = await store.show(1 as unknown as string);
    expect(result).toEqual({
      id:1,
      name: "T-shirt",
      price: 500,
      category: "sporty"
      } as Product);
  });

  it('delete method should remove the product', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.delete('/products')
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M')
    expect(response.status).toBe(200)
  });
});