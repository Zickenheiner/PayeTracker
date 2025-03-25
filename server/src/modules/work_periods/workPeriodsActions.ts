import type { RequestHandler } from "express";
import workPeriodsRepository from "./workPeriodsRepository";

const readByWorkSession: RequestHandler = async (req, res, next) => {
  try {
    const workSessionId = Number.parseInt(req.params.id);
    const workPeriods =
      await workPeriodsRepository.readByWorkSession(workSessionId);

    res.status(200).json(workPeriods);
  } catch (error) {
    next(error);
  }
};

export default { readByWorkSession };
