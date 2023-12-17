const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require("cors");
const { router } = require("../src/routes/main");
const patientController = require("./controllers/PatientController");
const userController = require("./controllers/UserController");
const { auth } = require("./utils/auth");
const http = require("http");
const { Server } = require("socket.io");
const { createAndDownloadPDF } = require("./controllers/DoctorController");

//require("dotenv").config();
//const {createUser,getUsers, updateUser, deleteUser} = require("./Routes/userController");
const MongoURI =
  "mongodb+srv://55Es3af:SVH8v8XKZSxU1J6p@cluster0.zqasadb.mongodb.net/Clinic?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

const port = process.env.PORT || "8000";

mongoose
  .connect(MongoURI, { dbName: "Clinic" })
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    const server = app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`User Connected:  ${socket.id}`);

      socket.on("join", async (senderId, receiverId) => {
        // Join a room with a unique identifier for the conversation
        const room = `${senderId}-${receiverId}`;
        console.log(room);
        await socket.join(room);
        console.log(`User ${senderId} joined the chat with ${receiverId}`);
      });

      socket.on("send_message", (data) => {
        console.log(
          data.senderId,
          data.receiverId,
          data.inputMessage,
          data.room,
          "in backend"
        );
        console.log(data.room, "in send");
        // Emit the message to the specific room
        socket.to(data.room).emit("receive_message", {
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: data.inputMessage,
        });
      });

      socket.emit("me", socket.id);

      socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
      });

      socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", {
          signal: data.signalData,
          from: data.from,
          name: data.name,
        });
      });

      socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
      });

      socket.on("callEnded", (data) => {
        io.to(data.to).emit("callEnded");
      });
    });
  })
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual origin of your React app
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/login", userController.login);
app.put("/forgetPassword", userController.forgetPassword);
//app.use(auth);
app.use("/", router);

app.get("/getSpec", patientController.getAllSpecialities);
