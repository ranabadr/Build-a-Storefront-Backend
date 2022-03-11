import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';
import { OrderItem, OrderItemStore } from '../../models/order_item';

const store = new OrderStore();
const storeU = new UserStore();
const storeP = new ProductStore();
const storeI = new OrderItemStore();

describe('Order Model', () => {
  let orderId = 0;
    let productId = 0;
    let userId = 0;
    beforeAll(async () => {
        const res = await storeU.create({
            firstname: 'Rana',
            lastname: 'Badr',
            password: 'password',
        });

        userId = res.id as unknown as number;

        const resP = await storeP.create({
                name: 'T-shirt',
                price: 500,
                category: 'sporty',
            })

        productId = resP.id as unknown as number;
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

    it('create method should add a order', async () => {
        const order: Order = await store.create({
            status: 'active',
            user_id: userId 
        });
        orderId = order.id as unknown as number;

        expect(order.status).toBe('active');
        expect(order.user_id).toBe(userId);
    });

    it('index method should return a list of orders', async () => {
        const orders: Order[] = await store.index();
        expect(orders).toContain({ id: orderId, status: 'active', user_id: userId });
    });

    it('show method should return the correct order', async () => {
        const order: Order = await store.show(orderId);

        expect(order.id).toBe(orderId);
    });

    it('addProduct method should work', async () => {
        const orderItem: OrderItem = await storeI.addProduct({quantity: 50, order_id: orderId, product_id: productId})

        expect(orderItem.order_id).toBe(orderId);
        expect(orderItem.product_id).toBe(productId);
    });

    it('delete method should remove the order', async () => {
        const order: Order = await store.delete(orderId)
        expect(order.id).toBe(orderId);
    });

});
