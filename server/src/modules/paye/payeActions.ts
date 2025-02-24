import type { RequestHandler } from "express";
import payeRepository from "./payeRepository";

const readByUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const workSessions = await payeRepository.readByUser(userId);

    res.status(200).json(workSessions);
  } catch (err) {
    next(err);
  }
};

export default { readByUser };
