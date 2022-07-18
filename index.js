const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Homepage route
app.get("/", (req, res) => {
    return res.send("Homepage");
})

const Port = process.env.PORT || 8080;

app.listen(Port, () => {
    console.log(`server running on ${Port}`)
})