import client from '../database';

export type User = {
     id: Number;
     firstName: string;
     lastName: string;
     password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
  
      const result = await conn.query(sql)
  
      conn.release()
  
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
   
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
      try {
    const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
    
    const conn = await client.connect();

    const result = await conn.query(sql, [u.firstName,u.lastName, u.password]);

    const user = result.rows[0];

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not add new user ${u.firstName}.${u.lastName}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<User> {
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'
   
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    const novel = result.rows[0]

    conn.release()

    return novel
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }
}