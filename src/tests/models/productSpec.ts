import { Product, ProductStore } from '../../models/product';
import dotenv from 'dotenv';

dotenv.config();

const store = new ProductStore()

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
});