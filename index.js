const { Server } = require( "socket.io");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http  = require("http");
const passport = require('./utils/passport');
const {Strategy} = require('passport-google-oauth20');
require("dotenv/config");
const session = require('express-session');

// importing other modules
const api = require("./routes/index");
const chat = require("./chat");


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


require("./chat/index")(io)

/* A middleware that is used to parse the incoming request bodies in a middleware before your handlers,
available under the req.body property. */
app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));
app.use('/images', express.static('uploads'));
app.use(
  session({
    secret: "yoursecretkey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.get("/", function(req, res) {
  return res.send("Welcome to the femstich apis")
})
app.use("/api", api);



/* Connecting to the database. */
mongoose.set("strictQuery", true); 
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log(err));



/* This is the port that the server will be listening on. */
const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log("listening on port http://localhost:" + port);
});


module.exports = app;
