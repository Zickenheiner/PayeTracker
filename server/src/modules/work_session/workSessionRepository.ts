import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Schedule {
  id: number;
  start: string;
  end: string;
}

interface WorkSession {
  id: number;
  user_id: number;
  date: string;
  schedules: Schedule;
}

class WorkSessionRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from work_session",
    );

    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from work_session where id = ?",
      [id],
    );

    return rows[0];
  }

  async readByUser(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from work_session where user_id = ?",
      [id],
    );

    return rows;
  }

  async readByUserCurrentMonth(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from work_session ws where ws.user_id = ? and year(ws.date) = year(curdate()) and month(ws.date) = month(curdate())",
      [id],
    );

    return rows;
  }

  async create(work_session: Omit<WorkSession, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into work_session (user_id, date, start, end) values (?, ?, ?, ?)",
      [
        work_session.user_id,
        work_session.date,
        work_session.schedules.start,
        work_session.schedules.end,
      ],
    );

    return result.insertId;
  }
}

export default new WorkSessionRepository();
