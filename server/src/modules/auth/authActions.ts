/// <reference path="../../types/express/index.d.ts" />
import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../user/userRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.readByEmail(req.body.email);

    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password,
    );

    if (verified) {
      const { hashed_password, ...userWithoutHashedPassword } = user;

      const myPayload: MyPayload = {
        sub: user.id.toString(),
      };

      const token = jwt.sign(myPayload, process.env.APP_SECRET as string, {
        expiresIn: "48h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        domain: "localhost",
        path: "/",
      });

      res.json({
        user_id: userWithoutHashedPassword.id,
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const logout: RequestHandler = async (_, res, next) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, _, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const verifyRequest: RequestHandler = (req, res, next) => {
  try {
    if (!req.auth) {
      throw new Error("Authentication failed");
    }

    res.json({
      user_id: Number.parseInt(req.auth.sub),
    });
  } catch (err) {
    next(err);
  }
};

export default { login, logout, hashPassword, verifyToken, verifyRequest };
