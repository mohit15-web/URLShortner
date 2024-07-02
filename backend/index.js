const express = require("express");
const fs = require("fs");
const shortid = require("shortid");
const cors = require("cors");
const app = express();

const isUrlValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

app.use(express.json());

app.use(cors());
app.post("/shorten", (req, res) => {
  const longUrl = req.body.url;
  console.log(longUrl);
  let ValidUrl = isUrlValid(longUrl);

  if (!ValidUrl) {
    return res.status(400).json({
      success: false,
      message: "Invalid Url",
    });
  }

  const urlsFromFile = fs.readFileSync("urls.json", { encoding: "utf-8" });
  const urlsJson = JSON.parse(urlsFromFile);

  let shortUrl = shortid.generate();
  urlsJson[shortUrl] = longUrl;
  console.log(urlsJson ,"urlsjson");
  console.log(shortUrl , "shorturl");
  fs.writeFileSync("urls.json", JSON.stringify(urlsJson));
  res.json({
    success: true,
    message: `https://urlshortner-txk2.onrender.com/${shortUrl}`,
  });
});

app.get("/:shortUrl", (req, res) => {
  const shortUrl = req.params.shortUrl;
  console.log(shortUrl);
  let longUrls = fs.readFileSync("urls.json", { encoding: "utf-8" });
  let urlsJson = JSON.parse(longUrls);
  const url = urlsJson[shortUrl];

  if (!url) {
    return res.status(404).json({
      success: false,
      message: "Invalid Url",
    });
  }

  res.redirect(url);
});

app.listen(process.env.PORT || 8000, () => console.log("server started"));
