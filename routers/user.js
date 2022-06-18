const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const lodash = require('lodash');
var jwt = require('jsonwebtoken');
require("dotenv").config();
const moment = require('moment');
require('moment-timezone');
const constants = require("../utils/constants");

var User = require('../models/user');
const auth = require("../middleware/auth");

router.post('/register', async (req, res) => {
  try {
    const { userName, email, password, age, gender, password2 } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await validateRegister(req, res);
    const user = await User.create(
      {
        userName: userName,
        email: email,
        password: hashPassword,
        age: age,
        gender: gender,
      }
    )
    const token = jwt.sign(
      { user_id: user._id, email: user.email, userName: user.userName, age: user.age, gender: user.gender },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    return Promise.reject(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!email || !password) {
      throw res.status(400).send("Cần nhập tài khoản và mật khẩu");
    } else
      if (!user) {
        throw res.status(400).json('Tài khoản không tồn tại');
      } else
        if (!checkPassword) {
          throw res.status(400).json('Nhập sai mật khẩu');
        } else {
          const token = jwt.sign(
            { user_id: user._id, email: user.email, userName: user.userName, age: user.age, gender: user.gender },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          return res.status(200).json(user);
        }
  } catch (err) {
    return Promise.reject(err);
  }
});

router.put('/info', auth, async (req, res) => {
  try {
    const updatedAt = moment.tz(constants.TIMEZONE).utc();
    const { password, userName, age, gender } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await validateInfoUser(req, res);
    const userUpdate = await User.updateOne(
      { _id: req.user.user_id },
      {
        userName: userName,
        password: hashPassword,
        age: age,
        gender: gender,
        updatedAt: updatedAt
      }
    )
    const token = jwt.sign(
      { user_id: userUpdate._id, email: userUpdate.email, userName: userUpdate.userName, age: userUpdate.age, gender: userUpdate.gender },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    userUpdate.token = token;
    res.status(200).json(userUpdate);
  } catch (err) {
    return Promise.reject(err);
  }
})

async function validateRegister(req, res) {
  const gen = ['Nam', 'nam', 'Nữ', 'nữ'];
  const { email, password, password2, userName, age, gender } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    throw res.status(300).json('Tài khoản đã tồn tại');
  }
  if (password !== password2) {
    throw res.status(300).json('Vui lòng nhập trùng mật khẩu');
  }
  if (parseInt(age) < 1) {
    throw res.status(300).json('Vui lòng nhập đúng tuổi');
  }
  if (!lodash.includes(gen, gender)) {
    throw res.status(300).json('Vui lòng nhập đúng giới tính');
  }
  if (!userName || !email || !password || !password2 || !age || !gender) {
    throw res.status(300).json('Vui lòng điền đầy đủ thông tin');
  }
  const isEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  if (!isEmail.test(email)) {
    throw res.status(300).json('Email không đúng định dạng');
  }
}

async function validateInfoUser(req, res) {
  const gen = ['Nam', 'nam', 'Nữ', 'nữ'];
  const { password, password2, userName, age, gender } = req.body;
  if (password != password2) {
    throw res.status(300).json('Vui lòng nhập trùng mật khẩu');
  }
  if (userName.length < 6) {
    throw res.status(300).json('Tên tối thiểu có 6 ký tự');
  }
  if (password.length < 6) {
    throw res.status(300).json('Mật khẩu tối thiểu có 6 ký tự');
  }
  if (parseInt(age) < 1) {
    throw res.status(300).json('Vui lòng nhập đúng tuổi');
  }
  if (!lodash.includes(gen, gender)) {
    throw res.status(300).json('Vui lòng nhập đúng giới tính');
  }
}

module.exports = router;