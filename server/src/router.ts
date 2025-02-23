import express from "express";
import authActions from "./modules/auth/authActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

/* ************************************************************************* */

router.post("/api/login", authActions.login);

router.post("/api/users", authActions.hashPassword, userActions.add);
/* ************************************************************************* */

export default router;
