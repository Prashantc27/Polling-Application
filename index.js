const express = require("express");
const { connectToMongoDB } = require("./config/mongoose");
const path = require("path");
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user');
const { restrictToLoggedinUserOnly } = require('./middlewares/auth');
const UserHistory = require("./routes/userHistory");

const app = express();
const port = 8002;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", restrictToLoggedinUserOnly, require("./routes/index"));

app.use("/user", userRoute);
app.use('/user', UserHistory);
app.use("/questions", require("./routes/questions"));
app.use("/postman/questions", require("./routes/questions"));
app.use("/postman", require("./routes/options"));



connectToMongoDB('mongodb://127.0.0.1:27017/Polling_Application')
  .then(() => {
    console.log("Mongodb connected");
    app.listen(port, () => {
      console.log("Server started");
    });
  });



