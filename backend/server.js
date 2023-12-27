const express = require('express');
const app = express();

require("dotenv").config();
const ip = "localhost";
const Port = process.env.PORT || 3000 ;
const mongoose = require("mongoose");
const helmet = require('helmet')

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
const cors = require('cors');


const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const protect = require("./middleware/authMiddleware")

const Routes = require('./routes/mainRoutes')



// setup the logger
app.use(express.json()) //can remove
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser());


app.use("/api" ,  Routes)

app.use(notFound);
app.use(errorHandler);



mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(Port, () => {
      console.log(`App listening at http://${ip}:${Port}`);
      console.log("Database Connected : " , result.connection.host,result.connection.name)
        
    });
  })
  .catch((err) => {
    console.log(err);
  });
