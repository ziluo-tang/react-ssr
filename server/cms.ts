import { Router, type Request, Response } from "express";
import multiparty from "multiparty";
import { join, basename } from "path";
import {
  existsSync,
  mkdirSync,
  rename,
  readdirSync,
  statSync,
  createReadStream,
} from "fs";
import jsZip from "jszip";
import { rimraf } from "rimraf";

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
  const { file = "/" } = req.query;
  const filePath = join(baseDir, file as string);
  const filename = encodeURI(basename(filePath));
  if (existsSync(filePath)) {
    const stat = statSync(filePath);
    res.set({
      "content-type": "application/octet-stream",
      "content-disposition": `attachment;filename=${filename}`,
    });
    if (stat.isFile()) {
      createReadStream(filePath).pipe(res);
    } else {
      //zip包
      res.set({
        "content-disposition": `attachment;filename=${filename}.zip`,
      });
      const zip = new jsZip();
      readDir(zip, filePath);
      zip
        .generateNodeStream({
          type: "nodebuffer",
          compression: "DEFLATE",
          compressionOptions: { level: 9 },
        })
        .pipe(res);
    }
  } else {
    res.json({
      code: -1,
      message: `no such file or directory: ${file}`,
    });
  }
});

router.get("/getAsset", (req: Request, res: Response) => {
  const { path = "/" } = req.query;
  try {
    if (!existsSync(baseDir)) {
      res.json({
        code: 1,
        data: [],
        message: "success",
      });
    }
    const files = readdirSync(join(baseDir, path as string));
    res.json({
      code: 1,
      data: files.map((file) => {
        const filePath = join(baseDir, path as string, file);
        const stat = statSync(filePath);
        const modifiedTime = stat.mtime.getTime();
        if (stat.isFile()) {
          return {
            path: filePath,
            name: file,
            size: stat.size,
            type: "file",
            modifiedTime,
          };
        } else {
          return {
            path: filePath,
            name: file,
            size: stat.size,
            type: "dir",
            modifiedTime,
          };
        }
      }),
      message: "success",
    });
  } catch (error) {
    res.status(500).send({
      code: -1,
      message: `no such file or directory: ${path}`,
    });
  }
});

router.delete("/delete", (req: Request, res: Response) => {
  const { path = "/" } = req.query;
  try {
    rimraf.sync(join(baseDir, path as string));
    res.json({
      code: 1,
      message: "success",
    });
  } catch (error) {
    res.status(500).send({
      code: -1,
      message: `no such file or directory: ${path}`,
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

const readDir = (zip: jsZip, dir: string) => {
  const files = readdirSync(dir);
  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isFile()) {
      zip.file(file, createReadStream(filePath));
    } else {
      const temp = zip.folder(file);
      readDir(temp, filePath);
    }
  });
};

export default router;
