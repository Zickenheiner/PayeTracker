import type { RequestHandler } from "express";
import workPeriodsRepository from "../work_periods/workPeriodsRepository";
import workSessionRepository from "./workSessionRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const workSessions = await workSessionRepository.readAll();

    res.status(200).json(workSessions);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const workSessionId = Number.parseInt(req.params.id);
    const workSession = await workSessionRepository.read(workSessionId);

    if (workSession == null) {
      res.sendStatus(404);
    } else {
      res.json(workSession);
    }
  } catch (err) {
    next(err);
  }
};

const readByUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const workSessions = await workSessionRepository.readByUser(userId);

    res.status(200).json(workSessions);
  } catch (err) {
    next(err);
  }
};

const readByUserCurrentMonth: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);

    const workSessions =
      await workSessionRepository.readByUserCurrentMonth(userId);

    res.status(200).json(workSessions);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const [firstSchedule, ...otherSchedules] = req.body.schedules;

    const newWorkSession = {
      user_id: req.body.user_id,
      date: req.body.date,
      schedules: firstSchedule,
    };

    const insertId = await workSessionRepository.create(newWorkSession);

    for (const schedule of otherSchedules) {
      await workPeriodsRepository.create({
        work_session_id: insertId,
        start: schedule.start,
        end: schedule.end,
      });
    }

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, readByUser, readByUserCurrentMonth, add };
