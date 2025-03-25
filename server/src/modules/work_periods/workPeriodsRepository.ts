import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface WorkPeriods {
  id: number;
  work_session_id: number;
  start: string;
  end: string;
}

class WorkPeriodsRepository {
  async readByWorkSession(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from work_periods where work_session_id = ?",
      [id],
    );

    return rows;
  }

  async create(work_period: Omit<WorkPeriods, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into work_periods (work_session_id, start, end) values (?, ?, ?)",
      [work_period.work_session_id, work_period.start, work_period.end],
    );

    return result.insertId;
  }
}

export default new WorkPeriodsRepository();
