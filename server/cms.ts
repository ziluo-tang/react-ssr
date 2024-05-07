import { Router, type Request, Response } from "express";
import multiparty from "multiparty";
import { join } from "path";
import { existsSync, mkdirSync, rename, readdirSync, statSync } from "fs";

const router = Router();

const baseDir = join(__dirname, "static");

router.post("/upload", (req: Request, res: Response) => {
  const multipart = new multiparty.Form();
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
              resolve(dest);
            });
          })
      )
    )
      .then((data) => {
        res.json({
          code: 1,
          data,
          message: "success",
        });
      })
      .catch((error) => {
        res.status(500).send({
          code: -1,
          error,
          message: "error",
        });
      });
  });
});

router.get("/download", (req: Request, res: Response) => {
  const { file } = req.query;
  res.sendFile(join(baseDir, file as string));
});

router.get("/getAsset", (req: Request, res: Response) => {
  const { path = "/" } = req.query;
  try {
    const files = readdirSync(join(baseDir, path as string));
    res.json(
      files.map((file) => {
        const filePath = join(baseDir, path as string, file);
        const stat = statSync(filePath);
        if (stat.isFile()) {
          return {
            path: filePath,
            name: file,
            size: stat.size,
            type: "file",
          };
        } else {
          return {
            path: filePath,
            name: file,
            size: stat.size,
            type: "dir",
          };
        }
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      code: -1,
      message: error.message,
    });
  }
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
