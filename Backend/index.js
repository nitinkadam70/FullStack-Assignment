const express = require("express");
const connection = require("./database")
const cors = require("cors");
require("dotenv").config();


//routes
const articleRouter = require("./Routes/articles.routes")
const authRouter = require("./Routes/auth.routes")

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRouter);
app.use("/user", articleRouter);

//Homepage route
app.get("/", (req, res) => {
    return res.send("Homepage");
})

const Port = process.env.PORT || 8080;

app.listen(Port, async () => {
    try {
        await connection
        console.log("Connected to DB successfully");
    }
    catch {
        console.log("Failed to connect DB")
    }
    console.log(`server running on localhost:${Port}`)
})