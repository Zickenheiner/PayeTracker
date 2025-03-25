import express from "express";
import authActions from "./modules/auth/authActions";
import userActions from "./modules/user/userActions";
import workPeriodsActions from "./modules/work_periods/workPeriodsActions";
import workSessionActions from "./modules/work_session/workSessionActions";

const router = express.Router();

/* ************************************************************************* */

router.get("/", (req, res) => {
  res.json({ message: "The API works" });
});

router.post("/login", authActions.login);
router.post("/logout", authActions.logout);

router.get("/verify-email", userActions.verifyEmail);
router.post("/users", authActions.hashPassword, userActions.add);

router.put("/users/:id", userActions.edit);

router.use(authActions.verifyToken);

router.get("/auth", authActions.verifyRequest);

router.get("/users/:id", userActions.read);

router.get("/work_sessions", workSessionActions.browse);
router.get("/work_sessions/:id", workSessionActions.read);
router.get("/work_sessions/user/:id", workSessionActions.readByUser);
router.get(
  "/work_sessions/current/user/:id",
  workSessionActions.readByUserCurrentMonth,
);
router.post("/work_sessions", workSessionActions.add);

router.get("/work_periods/:id", workPeriodsActions.readByWorkSession);

/* ************************************************************************* */

export default router;
