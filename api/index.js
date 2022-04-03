const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const userRouter = require("./routes/users")
const userAuth = require("./routes/auth")
const userPost = require("./routes/posts")
const userConversations = require('./routes/conversations')
const userMessages =require('./routes/messages')
const multer = require('multer')
const path = require("path");
//user to hide important keys
dotenv.config();
//connecting database
mongoose.connect(process.env.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to MongoDB")
});

app.use("/images", express.static(path.join(__dirname, "public/images")));
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});


//user all path after that appended eg userRouter get appended after api/user

app.use("/api/users", userRouter);
app.use("/api/auth", userAuth);
app.use("/api/posts", userPost)
app.use("/api/conversations",userConversations);
app.use("/api/messages",userMessages)
//listening port 8800

app.listen(process.env.PORT || 8800, () => {
    console.log("Running at 8800")
})