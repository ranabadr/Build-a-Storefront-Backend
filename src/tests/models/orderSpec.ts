import { Order, OrderStore } from '../../models/order';

const store = new OrderStore();



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

  it('create method should add an order', async () => {
    const result = await store.create({
        id: 1,
        status: "active",
        user_id: 1
    });
    expect(result).toEqual({
      id: 1,
      status: "active",
      user_id: 1
    });
  });
});