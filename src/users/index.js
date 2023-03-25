import express from "express";
import { User, Certificate } from "../models/users.js";
import { generateUUID } from "../utils/random-generator.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { walletAddress } = req.body;
    const uuid = generateUUID(16);
    await User.create([uuid, walletAddress, []]);
    return res.status(200).json({
      statusCode: 200,
      nessage: "created",
      data: {
        id: uuid,
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
    const { walletAddress, certificates } = req.body;
    await User.record(req.params.id).call("updateProfile", [walletAddress, certificates]);
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
    await User.record(req.params.id).call("del");
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
    const user = await User.where("walletAddress", "==", req.params.id).get();
    return res.status(200).json({
      statusCode: 200,
      message: "user fetched",
      data: user.data[0].data,
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
    });
  }
});

router.post("/certificate", async (req, res, next) => {
  try {
    const { universityName, year, certificateUrl, walletAddress, userId } = req.body;
    const certificateId = generateUUID(17);
    const transferredDate = new Date().toISOString();
    await Certificate.create([certificateId, universityName, year, transferredDate, certificateUrl, walletAddress, userId]);
    await User.record(userId).call("updateCertificate", [certificateId]);
    res.status(200).json({
      statusCode: 200,
      message: "certificate created",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      statusCode: 500,
      message: e.message,
    });
  }
});

router.delete("/certificate/:id", async (req, res, next) => {
  try {
    await Certificate.record(req.params.id).call("del");
    return res.status(200).json({ statusCode: 200, message: "certificate collection deleted" });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
    });
  }
});

export default router;
