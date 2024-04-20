import { Router, type Request, Response } from "express";
import multiparty from "multiparty";
import { join } from "path";
import { existsSync, mkdirSync, rename } from "fs";

const router = Router();

router.post("/upload", (req: Request, res: Response) => {
  const multipart = new multiparty.Form();
  const baseDir = join(__dirname, "static");
  if (!existsSync(baseDir)) {
    mkdirSync(baseDir);
  }
  multipart.parse(req, (error, fields, files) => {
    if (error) {
      res.status(500).send({
        code: -1,
        message: error.message,
      });
    }
    Promise.all(
      files.file.map(
        (file) =>
          new Promise((resolve, reject) => {
            mkdirSyncFromPath(baseDir, file.originalFilename);
            const dest = join(baseDir, file.originalFilename);
            rename(file.path, dest, (err) => {
              if (err) {
                console.log(err);
                reject(err);
              }
              resolve(true);
            });
          })
      )
    )
      .then(() => {
        res.json({
          code: 1,
          data: "success",
          msg: "上传成功",
        });
      })
      .catch((err) => {
        res.status(500).send({
          code: -1,
          data: "error",
          msg: "上传失败",
        });
      });
  });
});

const mkdirSyncFromPath = (baseDir: string, path: string) => {
  const dirs = path.split("/");
  dirs.pop();
  let dir = dirs.join("/");
  if (dir) {
    dir = join(baseDir, dir);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }
};

export default router;
