# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: '/products' [get]
- Show: '/products/:id' [get]
- Create: '/products' [post]
- Delete: '/products' [delete]

#### Users
- Index: '/users' [get]
- Show: '/users/:id' [get]
- Create: '/users' [post]
- Delete: '/users' [delete]


#### Orders
- Index: '/orders' [get]
- Show: '/orders/:id' [get]
- Create: '/orders' [post]
- Delete: '/orders' [delete]
- addProduct: '/orders/:id/products' [post]

## Data Shapes
#### Product
- id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- status
- user_id