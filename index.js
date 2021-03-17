const express = require("express");
const cors = require("cors");


const swapiRoutes = require("./routes/swapiRoutes");

const port = process.env.PORT || 4000;


const app = express();


app.use(
    cors({
        allowedHeaders: "Access-Control-Allow-Origin",
    })
);

app.use(swapiRoutes)

app.listen(port, () => {
    console.log(`Redis cache server running on port ${port}`)
})