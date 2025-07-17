const express = require("express");
const http = require("http");
const socket = require("socket.io");
const { Chess } = require("chess.js");

const app = express();
const server = http.createServer(app);
const io = socket(server)
const chess = new Chess();
let players = {};
let currentPlayer = "w";
const path = require("path");
const { localsName } = require("ejs");
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: `Chess Game` });
})

io.on("connection", (socket) => {
  console.log(`Connection Established with SocketId: ${socket.id}!!`);
  if (!players.white) {
    players.white = socket.id;
    socket.emit("playerRole", "w");
  }
  else if (!players.black) {
    players.black = socket.id;
    socket.emit("playerRole", "b");
  } else {
    socket.emit("spectatorRole");
  }

  socket.on("disconnect", () => {
    if (socket.id === players.white) {
      delete players.white;
      console.log("Player White Deleted !!");
    } else if (socket.id === players.black) {
      delete players.black;
      console.log("Player Black Deleted !!");
    } else {
      console.log("Spectator Disconnected !!");
    }
  });

  socket.on("move", (move) => {
    try {
      if (chess.turn() === "w" && socket.id !== players.white) return;
      if (chess.turn() === "b" && socket.id !== players.black) return;
      const result = chess.move(move);
      if (result) {
        currentPlayer = chess.turn();
        io.emit("move", move);
        io.emit("boardState", chess.fen());
      } else {
        console.log("Invalid Move: ", move);
        socket.emit("invalidMove", move);
      }
    }
    catch (err) {
      console.log(err);
      socket.emit("invalidMove", move);
    }
  });
});

server.listen(PORT, (err) => {
  console.log(`Running on PORT: ${PORT}`);
});


