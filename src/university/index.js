import express from "express";
import Uni from "../models/uni.js";
import emailService from "../utils/email-service.js";
import { generateUUID } from "../utils/random-generator.js";
const router = express.Router();
import multer from "multer";
import csv from "csvtojson";
import UniUpload from "../models/uni-upload.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", async (req, res, next) => {
  try {
    const { name, registrarName, year, month, email, vcName, walletAddress } = req.body;
    const uuid = generateUUID(15);
    const accessId = generateUUID(10);
    await Uni.create([uuid, name, registrarName, vcName, year, month, email, accessId, true, walletAddress]);
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
    // const uni = await Uni.get()
    // for(const ll of uni.data){
    //   console.log(ll.data.id)
    //   await Uni.record(ll.data.id).call('del')
    // }
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

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const {operatorName, facultyName, departmentName, month, year, accessId, walletAddress} = req.body
    const uni = await Uni.where("accessId", "==", accessId).get();
    if(!uni.data[0].data.accessId) res.status(400).json({statusCode:400, message:"access not found"})
    
    await UniUpload.create([accessId, operatorName, facultyName, departmentName, Number(month), Number(year)])
    const stream = req.file.buffer.toString();
    const data = await csv().fromString(stream);
    console.log("1", data);
    
    // const id = generateUUID(15);
    // await emailService({
    //   text: `Hi, your university access id:${id}`,
    //   subject: "WELCOME",
    //   recipient: "chukwuchinonsoephraim@gmail.com",
    // });
    return res.status(200).json({
      statusCode: 200,
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: e.message,
    });
  }
});
export default router;
