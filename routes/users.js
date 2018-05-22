import express from 'express';
import Validator from 'validator';
import mongoose from 'mongoose';
import '../models/users.js';
import jwt from 'jsonwebtoken';

const users = mongoose.model('users');
let router = express.Router();

router.post('/', (req, res) => {
  let data = {
    userName: req.body.username,
    userEmail: req.body.useremail,
    userPassword: req.body.userpassword
  }
  var user = new users(data);
  user.save()
  res.json({"success": true})
});

router.post('/login', (req, res) => {
  users.findOne({
    "userName": req.body.username,
    "userPassword": req.body.userpassword
  }).then((user) => {
    if(user){
      const token = jwt.sign({
        username: user.userName,
        details: user
      }, 'aDSDJFNSDKBKSDBGKSDF');
      res.json({ token })
    }else{

    }
  }).catch((err) => console.log(err))
});

router.get('/details', (req, res) => {
  users.findOne({
    "userName": req.query.nickname
  }).then((user) => {
    res.json(user);
  }).catch((err) => console.log(err))

})

router.post('/searchUser', (req, res) => {
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    const regex = new RegExp(escapeRegex(req.body.search), 'gi');

    users.find({ "userName": regex }, function(err, result){
        res.json(result);
    });
})

export default router;
