CREATE TABLE order_items (
   id SERIAL PRIMARY KEY,
   quantity integer,
   order_id bigint REFERENCES orders(id),
   product_id bigint REFERENCES products(id)
);