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
    const result = await store.create({  
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    expect(result).toEqual({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
         });
  });

  it('index method should return a list of users', async () => {
    const token = await request.post("/users").send({
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    });
    const response = await request.get('/users')
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNjQ2ODUwMDY2fQ.O-YO45zsBPAYN1HFfsAUQIbn2-aE0C0Jb8O6r8GWXhY')
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
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNjQ2ODUwMDY2fQ.O-YO45zsBPAYN1HFfsAUQIbn2-aE0C0Jb8O6r8GWXhY')
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
    .set("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1OCwiZmlyc3RuYW1lIjoiUmFuYSIsImxhc3RuYW1lIjoiQmFkciIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNjQ2ODUwMDY2fQ.O-YO45zsBPAYN1HFfsAUQIbn2-aE0C0Jb8O6r8GWXhY')
    expect(response.status).toBe(200)
  });
});