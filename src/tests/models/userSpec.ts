import supertest from 'supertest';
import { User, UserStore } from '../../models/user';
import app from '../../server';

const store = new UserStore();

const request = supertest(app);

describe("User Model", () => {
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

  it('create method should add a user', async () => {
    const result = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    
    expect(result.status).toBe(200) 
  });

  it('index method should return a list of users', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.get('/users')
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M')
    expect(response.status).toBe(200)
  });

  it('show method should return the correct user', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.get('/users/:id')
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M')
    expect(response.status).toBe(200)
  });

  it('delete method should remove the user', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.delete('/users')
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2MSwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoiJDJiJDEwJG9aVWFXaDBBRFhmRGc5ZklHYi9LVHVrNzEvdmpkaE11aXVUeEQ4dDJwdTlEdnZGMUZ2SS9HIn0sImlhdCI6MTY0NjkwNzIwN30.FF_Y677nKlHRm8z074W36OXrT1YqSjGkbrPYrfM6_5M')
    expect(response.status).toBe(200)
  });
});