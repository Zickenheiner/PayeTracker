import express from "express";
import authActions from "./modules/auth/authActions";
import payeActions from "./modules/paye/payeActions";
import userActions from "./modules/user/userActions";
import workSessionActions from "./modules/work_session/workSessionActions";

const router = express.Router();

/* ************************************************************************* */

router.post("/api/login", authActions.login);
router.post("/api/logout", authActions.logout);

router.get("/api/verify-email", userActions.verifyEmail);
router.post("/api/users", authActions.hashPassword, userActions.add);

// router.use(authActions.verifyToken);

router.get("/api/auth", authActions.verifyRequest);

router.get("/api/work_sessions", workSessionActions.browse);
router.get("/api/work_sessions/:id", workSessionActions.read);
router.get("/api/work_sessions/user/:id", workSessionActions.readByUser);
router.post("/api/work_sessions", workSessionActions.add);

router.get("/api/payes/:id", payeActions.readByUser);
/* ************************************************************************* */

export default router;
