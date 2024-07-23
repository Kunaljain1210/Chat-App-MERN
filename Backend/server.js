import path from "path"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./DB/connectToMongoDB.js";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js"
import userRoute from "./routes/user.route.js"
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 6060;

const __dirname = path.resolve();

dotenv.config();


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

//Middleware
app.use(express.static(path.join(__dirname, "Frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on Port NO ${PORT} `);
});