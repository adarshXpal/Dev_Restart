const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:videoId/:fileName", async (req, res) => {
  const { videoId, fileName } = req.params;

  const namenodeHost = "localhost";
  const namenodePort = 9870;
  const path = `/videos/${videoId}/${fileName}`;
  const hdfsUrl = `http://${namenodeHost}:${namenodePort}/webhdfs/v1${path}?op=OPEN`;

  try {
    const response = await axios.get(hdfsUrl, { responseType: "stream" });
    res.set(response.headers);
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send("Stream Error");
  }
});

module.exports = router;
