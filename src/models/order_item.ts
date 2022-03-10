import client from '../database';

export type OrderItem = {
    id?: number;
    quantity: number;
    product_id: number;
    order_id: number;
  };

  export class OrderItemStore {
    async addProduct(
      quantity: number,
      order_id: number,
      product_id: number
    ): Promise<OrderItem> {
      try {
        const conn = await client.connect();
        const sql =
          'INSERT INTO order_items (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
        const result = await conn.query(sql, [quantity, order_id, product_id]);
        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(
          `Could not add product ${product_id} to order ${order_id}. Error: ${err}`
        );
      }
    }
  
    async deleteAll(order_id: number): Promise<void> {
      try {
        const conn = await client.connect();
        const sql = 'DELETE FROM order_products WHERE order_id = ($1)';
        await conn.query(sql, [order_id]);
        conn.release();
      } catch (err) {
        throw new Error(
          `Could not delete order details for order id: ${order_id}. Error: ${err}`
        );
      }
    }
  }