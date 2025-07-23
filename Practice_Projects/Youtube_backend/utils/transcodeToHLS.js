const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

const transcodeToHLS = async (inputPath, videoId) => {
  const outputDir = path.join(__dirname, `../temp/${videoId}`);
  await fs.ensureDir(outputDir);

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-preset", "veryfast",
        "-g", "48",
        "-sc_threshold", "0",
        "-map", "0:v:0",
        "-map", "0:a:0?",
        "-f", "hls",
        "-hls_time", "4",
        "-hls_playlist_type", "vod",
        "-hls_segment_filename", path.join(outputDir, "segment%d.ts")
      ])
      .output(`${outputDir}/index.m3u8`)
      .on("end", async () => {
        const hdfsPath = `/videos/${videoId}`;

        try {
          await execPromise(`hdfs dfs -mkdir -p ${hdfsPath}`);
          await execPromise(`hdfs dfs -put ${outputDir}/* ${hdfsPath}`);
          await fs.remove(outputDir);
          resolve(hdfsPath);
        } catch (error) {
          reject(`HDFS Error: ${error.message}`);
        }
      })
      .on("stderr", (line) => {
        console.log("FFmpeg:", line);
      })
      .on("error", (err) => {
        console.error("FFmpeg failed:", err.message);
        reject(err.message);
      })
      .run();
  });
};

module.exports = transcodeToHLS;
