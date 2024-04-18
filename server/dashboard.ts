import { Router, type Request, Response } from "express";
const router = Router();

router.get("/", (req: Request & { user: any }, res: Response) => {
  const username = req.user.user;
  res.json([
    { label: "UserName", children: username },
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
