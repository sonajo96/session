const express = require("express");
const cors = require("cors");
const session=require("express-session")
const { connectDB } = require("./config/database");
const router=require("./routes/user.routes")
const User = require("./models/user");
const { register, login } = require("./controller/user.controller");


const app = express();
require("dotenv").config();


app.use(express.json());
app.use(cors());

app.use(
    session({
      secret: process.env.SESSION_SECRET, 
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 5 * 60 * 1000, 
      },
    })
  );

app.use("/api/users", router);


(async () => {
  await connectDB();
  await User.sync(); 
})();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});