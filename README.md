# Build a Storefront Backend

## Table of Contents

-   [Setup ](#setup )
-   [Ports ](#ports )
-   [Installatin](#installatin)

## Setup

#### In psql run the following:
-   CREATE USER full_stack_user WITH PASSWORD 'password123';
-   CREATE DATABASE full_stack_dev;
-   \c full_stack_dev
-   GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;

## Ports

-   The backend runing on: 3000 
-   The database runing on: 5432

## Installatin

### Dependencies

 Install:
 -   bcrypt
 -   body-parser
 -   cors
 -   db-migrate
 -   db-migrate-pg
 -   dotenv
 -   express
 -   jasmine
 -   jasmine-spec-reporter
 -   jsonwebtoken
 -   pg
### Devdependencies
 
 Install:
 -  @types/bcrypt
 -   @types/cors
 -   @types/express
 -   @types/jasmine
 -   @types/jsonwebtoken
 -   @types/node
 -  @types/pg
 -   @typescript-eslint/eslint-plugin
 -   @typescript-eslint/parser
 -   eslint
 -   eslint-config-prettier
 -   eslint-plugin-prettier
 -   jasmine-ts
 -   nodemon
 -   prettier
 -   ts-node
 -   typescript

### .env file
 
 Create a .env file based on the settings below:

 POSTGRES_HOST=127.0.0.1
 POSTGRES_DB=full_stack_dev
 POSTGRES_TEST_DB=full_stack_test
 POSTGRES_USER=full_stack_user
 POSTGRES_PASSWORD=password123
 BCRYPT_PASSWORD=my_password
 SALT_ROUNDS=10
 TOKEN_SECRET=alohomora123!
 ENV=dev