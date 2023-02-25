const express = require('express');
const { authenticate } = require('../Middleware/autenticate.user');
const profileRouter = express.Router()
const {UserModel}= require('../Model/user.model')




profileRouter.get("/getProfile",authenticate, async (req, res) => {
    let userId = req.body.userID;
    try {
      const user = await UserModel.findOne({ _id: userId });
      res.send(user);
    } catch (err) {
      res.send("Something went wrong");
      console.log(err);
    }
  });

  profileRouter.patch("/editProfile",authenticate, async (req, res) => {
    let userId = req.body.userId;
    let payload = req.body;
    try {
      const user = await UserModel.findByIdAndUpdate(
        { _id: userId },
        { ...payload }
      );
      res.send(user);
    } catch (err) {
      res.send("Something went wrong");
      console.log(err);
    }
  });

  module.exports={
    profileRouter
}