import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  hashed_password: string;
  lastname: string;
  firstname: string;
  birthdate: string;
  sex: string;
  rate: number;
};

class UserRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, email, firstname, lastname, DATE_FORMAT(birthdate, '%Y-%m-%d') AS birthdate, sex, rate FROM user WHERE id = ?",
      [id],
    );

    return rows[0] as User;
  }

  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );

    return rows[0] as User;
  }

  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into user (email, hashed_password, lastname, firstname, birthdate, sex, rate) values (?, ?, ?, ?, ?, ?, ?)",
      [
        user.email,
        user.hashed_password,
        user.lastname,
        user.firstname,
        user.birthdate,
        user.sex,
        user.rate,
      ],
    );

    return result.insertId;
  }

  async update(key: string, value: string, id: number) {
    const [result] = await databaseClient.query<Result>(
      `update user set ${key} = ? where id = ?`,
      [value, id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from user where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new UserRepository();
