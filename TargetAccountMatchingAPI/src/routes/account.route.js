import express from "express";
import {
  getAccount,
  getAllAccounts,
  updateAccountStatus,
} from "../controllers/account.controller.js";
import verifyUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllAccounts);
router.get("/:id", getAccount);
router.post("/:id/status", verifyUser, updateAccountStatus);

export default router;
