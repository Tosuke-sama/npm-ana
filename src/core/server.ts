import * as http from "http";
import * as childProcess from "child_process";
import * as path from "path";
import * as fs from "fs";

const extName2FileType: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".svg": "image/svg+xml;charset=utf-8",
  ".html": "text/html;charset=utf8",
  ".js": "application/javascript;charset=utf8",
  ".css": "text/css;charset=utf8",
};

// TODO: 传入端口等参数
export const startServer = async () => {
  const port = 2333;
  const server = http.createServer((req, res) => {
    console.log("路径", req.url);
    let resFilePath = "/index.html";
    if (req.url !== "/") {
      resFilePath = req?.url || "/index.html";
    }
    const extName = path.extname(resFilePath);
    const fileType = extName2FileType[extName] ?? extName2FileType[".html"];

    res.setHeader("content-type", fileType);
    res.on("close", () => {
      console.log("success!");
    });

    const htmlFilePath = path.resolve(__dirname, `../view${resFilePath}`);
    fs.createReadStream(htmlFilePath).pipe(res);
  });

  server.listen(port, () => {
    console.log(__dirname);
    console.log(`服务器已经在${port}上开启`);
    childProcess.exec(`start http://localhost:${port}`);
  });
};

// export const startFrontEnd = async () => {
//   console.log("前端已启动");
//   childProcess.execSync("npm dev");
// };
