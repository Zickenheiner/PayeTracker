import express from "express";
import authActions from "./modules/auth/authActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

/* ************************************************************************* */

router.post("/api/login", authActions.login);
router.post("/api/logout", authActions.logout);

router.post("/api/users", authActions.hashPassword, userActions.add);

router.use(authActions.verifyToken);

router.get("/api/auth", authActions.verifyRequest);

/* ************************************************************************* */

export default router;
