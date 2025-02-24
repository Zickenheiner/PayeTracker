import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Paye {
  id: number;
  work_session_id: number;
  gross: number;
  net: number;
}

class PayeRepository {
  async readByUser(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select p.* from paye p join work_session ws on p.work_session_id = ws.id where ws.user_id = ? and year(ws.date) = year(curdate()) and month(ws.date) = month(curdate())",
      [userId],
    );

    return rows;
  }
  async create(paye: Omit<Paye, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into paye (work_session_id, gross, net) values (?, ?, ?)",
      [paye.work_session_id, paye.gross, paye.net],
    );

    return result.insertId;
  }
}

export default new PayeRepository();
