const { exec } = require("child_process");
const path = require("path");

function uploadFolderToHDFS(localFolderPath, hdfsTargetPath) {
  return new Promise((resolve, reject) => {
    const command = `hdfs dfs -mkdir -p ${hdfsTargetPath} && hdfs dfs -put -f ${localFolderPath}/* ${hdfsTargetPath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error uploading to HDFS:", stderr);
        reject(error);
      } else {
        console.log("Uploaded to HDFS:", stdout);
        resolve(true);
      }
    });
  });
}

module.exports = { uploadFolderToHDFS };
