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
        id: 2,
        firstName: "salma",
        lastName: "badr",
        password: "pass123"
    });
    const response = await request.post('/products').send({
        name: "T-shirt",
        price: 500,
        category: "sporty"
    })
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1NSwiZmlyc3RuYW1lIjoic2FsbWEiLCJsYXN0bmFtZSI6ImJhZHIiLCJwYXNzd29yZCI6InBhc3MxMjMifSwiaWF0IjoxNjQ2ODM1MTc1fQ.B9clGCUFww18US0TXNKogleWTJQ0hmrLUpjID7uHHTQ')
    expect(response.status).toBe(200)
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      name: "T-shirt",
      price: 500,
      category: "sporty"}] as unknown as Product[]);
  });

  it('show method should return the correct product', async () => {
    const result: Product = await store.show("1");
    expect(result).toEqual({
      name: "T-shirt",
      price: 500,
      category: "sporty"
      } as Product);
  });

  it('delete method should remove the product', async () => {
    const token = await request.post("/users").send({
      id: 2,
      firstName: "salma",
      lastName: "badr",
      password: "pass123"
    });
    const response = await request.delete('/products')
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1NSwiZmlyc3RuYW1lIjoic2FsbWEiLCJsYXN0bmFtZSI6ImJhZHIiLCJwYXNzd29yZCI6InBhc3MxMjMifSwiaWF0IjoxNjQ2ODM1MTc1fQ.B9clGCUFww18US0TXNKogleWTJQ0hmrLUpjID7uHHTQ')
    expect(response.status).toBe(200)
  });
});