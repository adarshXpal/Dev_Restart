const express = require("express");
const { PORT } = require("./config");
const apiRouter = require("./routes");

const app = express();
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Running Server on http://localhost:${PORT}`);
});

