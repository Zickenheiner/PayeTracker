import type { RequestHandler } from "express";
import {
  calculateAmount,
  calculateHours,
} from "../../../services/hoursService";
import payeRepository from "../paye/payeRepository";
import userRepository from "../user/userRepository";
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
    const workSessionId = Number(req.params.id);
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
    const userId = Number(req.params.id);
    const workSessions = await workSessionRepository.readByUser(userId);

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

    const rateMinutes = (await userRepository.read(req.body.user_id)).rate / 60;

    const { hoursMoved, hoursNotMoved } = calculateHours(
      firstSchedule,
      otherSchedules,
    );

    const amount = calculateAmount(hoursMoved, hoursNotMoved, rateMinutes);

    const insertId = await workSessionRepository.create(newWorkSession);

    for (const schedule of otherSchedules) {
      await workPeriodsRepository.create({
        work_session_id: insertId,
        start: schedule.start,
        end: schedule.end,
      });
    }

    await payeRepository.create({
      work_session_id: insertId,
      gross: amount,
      net: amount * 0.78,
    });

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, readByUser, add };
