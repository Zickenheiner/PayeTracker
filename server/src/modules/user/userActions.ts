import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    const { hashed_password, ...userWithoutHashedPassword } = user;

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(userWithoutHashedPassword);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      birthdate: req.body.birthdate,
      sex: req.body.sex,
      rate: req.body.rate,
    };

    const insertId = await userRepository.create(newUser);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { key, value } = req.body;

    const affectedRows = await userRepository.update(
      key,
      value,
      Number.parseInt(id),
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const affectedRows = await userRepository.delete(Number.parseInt(id));

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};

const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const email = req.query.email as string;
    const user = await userRepository.readByEmail(email);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};

export default { read, add, edit, destroy, verifyEmail };
