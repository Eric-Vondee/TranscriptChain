import express from "express";
import UserRouter from "../src/users/index.js"
import UniRouter from "../src/university/index.js"
const router = express.Router()

router.use("/universities", UniRouter);
router.use("/users", UserRouter);


export default router;