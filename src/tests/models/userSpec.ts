import { User, UserStore } from '../../models/user';

const store = new UserStore()

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
    const result = await store.index();
    expect(result).toEqual([{
      id: 1,
      firstName: "Rana",
      lastName: "Badr",
      password: "password"
    }]);
  });

  it('show method should return the correct users', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
        id: 1,
        firstName: "Rana",
        lastName: "Badr",
        password: "password"
    });
  });

  it('delete method should remove the user', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual([]);
  });
});