require("dotenv").config();
const express = require("express");
const { UserModel } = require("../Model/user_Model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
let Key = "AccessToken";
const userRegister = express.Router();

userRegister.post("/signup", async (req, res) => {
  let { email, password, name, mobile, address } = req.body;
  let User = await UserModel.findOne({ email });
  if (User) {
    res.send(`User already register with email:${email}`);
  }
  let hashPassword = await bcrypt.hash(password, 5);
  try {
    if (hashPassword) {
      let user = await UserModel.create({
        email,
        password: hashPassword,
        name,
        mobile,
        address,
      });
      if (user) {
        res.send("User has been created successfully");
      } else {
        res.send("User is not created");
      }
    } else {
      res.send("Please change the password");
    }
  } catch (err) {
    res.send(err);
  }
});

userRegister.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let User = await UserModel.findOne({ email });
  try {
    if (User) {
      bcrypt.compare(password, User.password, (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result) {
          let token = jwt.sign({ user: User._id }, Key);
          // console.log("in login/token " , token)
          res.send({
            msg: "Login Successfully",
            token,
          });
        } else {
          res.send("Password is wrong");
        }
      });
    } else {
      res.status(401).send("Authentication failed");
    }
  } catch (err) {
    res.send(err);
  }
});

userRegister.get("/getname", async (req, res) => {
  let token = req.headers.token;
  console.log(token);
  try {
    let Userid = await jwt.verify(token, Key);
    console.log(Userid)
    let User = await UserModel.findOne({ _id: Userid.user });
    console.log(User)
    res.send(User);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

module.exports = { userRegister };
