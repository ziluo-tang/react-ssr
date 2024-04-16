import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    console.log('server recevied')
  res.json([
    {
      name: "tangxiaoxin",
      email: "1302947749@qq.com",
      avatar: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      git: "https://github.com/ziluo-tang",
    },
  ]);
});

export default router;
