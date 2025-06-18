const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

const SECRET = "iot-secret"; // رمز برای امنیت درخواست‌ها
const DEST = "https://your-cloudflare-worker.workers.dev"; // آدرس نهایی (ورکر کلودفلر)

app.use("/", createProxyMiddleware({
  target: DEST,
  changeOrigin: true,
  ws: true,
  pathRewrite: { "^/": "/" },
  onProxyReq: (proxyReq, req, res) => {
    if (req.headers['x-secret'] !== SECRET) {
      res.statusCode = 403;
      res.end("Forbidden");
    }
  }
}));

app.listen(process.env.PORT || 3000, () => {
  console.log("IoT Proxy Started");
});
