const express = require("express");

const app = app.express();

const Port = process.env.PORT || 8080;

app.listen(Port, () => {
    console.log(`server running on ${port}`)
})