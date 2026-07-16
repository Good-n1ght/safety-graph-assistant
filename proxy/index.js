const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url param");

  fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "Accept-Language": "zh-CN,zh;q=0.9"
    }
  })
    .then(r => r.text())
    .then(body => {
      res.set("Access-Control-Allow-Origin", "*");
      res.type(r.headers.get("content-type") || "text/html");
      res.send(body);
    })
    .catch(e => res.status(502).send("Proxy error: " + e.message));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("CORS proxy on port " + PORT));