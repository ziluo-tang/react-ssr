import { Router, type Request, Response } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json([
    { label: "UserName", children: "Zhou Maomao" },
    { label: "Telephone", children: "1810000000" },
    { label: "Live", children: "Hangzhou, Zhejiang" },
    { label: "Remark", children: "empty" },
    {
      label: "Address",
      children:
        "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
    },
  ]);
});

export default router;
