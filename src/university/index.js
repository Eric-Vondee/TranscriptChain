import express from "express";
import Uni from "../models/uni.js";
import { generateUUID } from "../utils/random-generator.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, registrarName, year, month, email, vcName } = req.body;
    const uuid = generateUUID(15);
    const accessId = generateUUID(10);
    await Uni.create([uuid, name, registrarName, vcName, year, month, email, accessId, true]);
    return res.status(200).json({
      statusCode: 200,
      nessage: "application successful",
      data: {
        accessId: accessId,
      },
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { isVerified, walletAddress } = req.body;
    await Uni.record(req.params.id).call("updateProfile", [isVerified, walletAddress]);
    return res.status(200).json({ statusCode: 200, message: "profile updated" });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Uni.record(req.params.id).call("del");
    return res.status(200).json({ statusCode: 200, message: "collection deleted" });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const university = await Uni.record(req.params.id).get();
    return res.status(200).json({
      statusCode: 200,
      message: "University fetched",
      data: university.data,
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
    });
  }
});
export default router;
