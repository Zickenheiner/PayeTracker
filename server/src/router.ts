import express from "express";
import authActions from "./modules/auth/authActions";
import userActions from "./modules/user/userActions";
import workPeriodsActions from "./modules/work_periods/workPeriodsActions";
import workSessionActions from "./modules/work_session/workSessionActions";

const router = express.Router();

/* ************************************************************************* */

router.post("/api/login", authActions.login);
router.post("/api/logout", authActions.logout);

router.get("/api/verify-email", userActions.verifyEmail);
router.post("/api/users", authActions.hashPassword, userActions.add);

router.put("/api/users/:id", userActions.edit);

router.use(authActions.verifyToken);

router.get("/api/auth", authActions.verifyRequest);

router.get("/api/users/:id", userActions.read);

router.get("/api/work_sessions", workSessionActions.browse);
router.get("/api/work_sessions/:id", workSessionActions.read);
router.get("/api/work_sessions/user/:id", workSessionActions.readByUser);
router.get(
  "/api/work_sessions/current/user/:id",
  workSessionActions.readByUserCurrentMonth,
);
router.post("/api/work_sessions", workSessionActions.add);

router.get("/api/work_periods/:id", workPeriodsActions.readByWorkSession);

/* ************************************************************************* */

export default router;
