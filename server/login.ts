import { Router } from "express";
import { sign } from "jsonwebtoken";
import { secretKey } from "./const";

const router = Router();

router.post("/", (req, res) => {
  const { body } = req;
  const token = sign(body, secretKey, {
    expiresIn: "7d", //7days
    algorithm: "HS256",
  });
  res.json({
    code: 1,
    token,
    message: "success",
  });
});

export default router;
