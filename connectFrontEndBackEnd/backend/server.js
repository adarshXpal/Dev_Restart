import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("dist"));


app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "A joke",
      content: "Badiya",
    },
    {
      id: 2,
      title: "A another JOke",
      content: "Bad ass",
    },
    {
      id: 3,
      title: "A joke",
      content: "Badiya",
    },
    {
      id: 4,
      title: "A joke",
      content: "Badiya",
    }

  ];
  res.send(jokes);
});
app.get("/", (req, res) => {
  res.send("Hey");
});
app.listen(PORT, (err) => {
  console.log(`Serve at http://localhost:${PORT}`);
});
