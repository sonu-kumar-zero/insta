import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import authroute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import uploadRoute from "./routes/upload.js";
import chatRoute from "./routes/chat.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";

// configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const io = new Server({ cors: true });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// -----------------------------------------------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontendm/build")));

  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname1, "frontendm", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send({ message: "api is running" });
  });
}

// -----------------------------------------------------------------

// file storage
// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,"public/assets");
//     },
//     filename : function(req,file,cb){
//         cb(null,file.originalname);
//     }
// });
// const upload = multer({storage});

// routes with files
// app.post('/auth/register', upload.single("picture"), register);
app.post("/auth/register", register);
app.post("/posts", verifyToken, createPost);
// app.post('/posts',verifyToken, upload.single("picture"), createPost);

// routes
app.use("/auth", authroute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/upload", uploadRoute);
app.use("/chat", chatRoute);

// mongoose setup
const port = process.env.PORT || 6001;
const portio = process.env.PORTIO || 6002;
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userIdToSocketMaping = new Map();
const socketToUserIdMaping = new Map();

io.on("connection", (socket) => {
  console.log("new connection");

  socket.on("user-added", (data) => {
    const { userId } = data;
    console.log("User logged in");
    userIdToSocketMaping.set(userId, socket.id);
    socketToUserIdMaping.set(socket.id, userId);
    console.log({ userid: userId, sockedId: socket.id });
    socket.broadcast.emit("user-online", { online: true });
  });

  socket.on("user-logout", (data) => {
    const { userId } = data;
    console.log("User logged out");
    userIdToSocketMaping.delete(userId);
    socketToUserIdMaping.delete(socket.id);
    console.log(userId);
  });

  socket.on("friendadd", (data) => {
    const { friendId } = data;
    const socketId = userIdToSocketMaping.get(friendId);
    socket
      .to(socketId)
      .emit("friendadd", { message: "new user added you as a friend" });
  });

  socket.on("new-post", () => {
    socket.emit("new-post", { message: "new post uploaded" });
    socket.broadcast.emit("new-post", { message: "new post uploaded" });
  });

  socket.on("new-message", (data) => {
    const { friendId, userId } = data;
    const socketId = userIdToSocketMaping.get(friendId);
    socket.to(socketId).emit("new-message", {
      message: "new message received",
      friendId: userId,
    });
  });

  socket.on("user-online", (data) => {
    const { friendId } = data;
    const sockedId = userIdToSocketMaping.get(friendId);
    if (sockedId == undefined) {
      socket.emit("user-online", { online: false });
    } else {
      socket.emit("user-online", { online: true });
    }
  });

  socket.on("chat-write", (data) => {
    const { friendId, userId } = data;
    const socketId = userIdToSocketMaping.get(friendId);

    socket.to(socketId).emit("chat-write", { writing: true });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-online", { online: false });
    console.log("Connection closed");
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

io.listen(portio, () => {
  console.log(`socket connected on port ${portio}`);
});
