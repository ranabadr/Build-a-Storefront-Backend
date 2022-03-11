import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
    let userId = 0;
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
        const user:User = await store.create({
            firstname: 'Rana',
            lastname: 'Badr',
            password: 'password',
        });

        expect(user.firstname).toBe('Rana');
        userId = user.id as unknown as number;
    });

    it('index method should return a list of users', async () => {
        const users: User[] = await store.index();
        
        expect(users.length).toBeGreaterThan(0);
    });

    it('show method should return the correct user', async () => {
        const user: User = await store.show(userId);
        
        expect(user.id).toBe(userId);
    });

    it('delete method should remove the user', async () => {
        const user: User = await store.delete(userId);
        
        expect(user.id).toBe(userId);
    });
});
