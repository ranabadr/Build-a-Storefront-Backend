import supertest from 'supertest';
import { Product, ProductStore } from '../../models/product';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();

const store = new ProductStore();

const request = supertest(app);

describe('Product Model', () => {
    let productId = 0;

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
        const product: Product = await store.create({
            name: 'T-shirt',
            price: 500,
            category: 'sporty',
        })

        productId = product.id as unknown as number;
        expect(product.id).toBeGreaterThan(0);
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        
        expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(productId);
        expect(result).toEqual({
            id: productId,
            name: 'T-shirt',
            price: 500,
            category: 'sporty',
        } as Product);
    });

    it('delete method should remove the product', async () => {
        const result = await store.delete(productId);
        expect(result).toEqual({
            id: productId,
            name: 'T-shirt',
            price: 500,
            category: 'sporty',
        } as Product);
    });
});
