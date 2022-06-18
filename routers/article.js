const express = require('express');
const router = express.Router();
const lodash = require('lodash');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const multer = require('multer');
const slugify = require('slugify');
const constants = require("../utils/constants");
const Article = require('../models/article');
const auth = require("../middleware/auth");
const moment = require('moment');
require('moment-timezone');
const Category = require('../models/category');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


const upload = multer({
  storage: storage
}).single('file');

router.post('/create', async (req, res) => {
  try {
    const owner = req.user.user_id;
    const { title, description, content, avatar, status, categoryId } = req.body;
    await validateArticle(req, res);
    const article = await Article.create(
      {
        title: title,
        description: description,
        content: content,
        avatar: avatar,
        status: status,
        owner: owner,
        category: categoryId
      }
    )
    res.status(201).json(article);
  } catch (err) {
    return Promise.reject(err);
  }
})

router.get('/news', async (req, res) => {
  const status = req.query.status;
  try {
    if (status === constants.DRAFT || status === constants.PUBLIC) {
      const articles = await Article.find({ status: status }).sort({
        createdAt: 'desc'
      })
      res.status(201).json(articles);
    } else {
      const articles = await Article.find().sort({
        createdAt: 'desc'
      })
      res.status(201).json(articles);
    }
  } catch (err) {
    return Promise.reject(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedAt = moment.tz(constants.TIMEZONE).utc();
    const { title, description, content, avatar, status } = req.body;
    await validateArticle(req, res);
    const article = await Article.updateOne(
      { _id: req.params.id },
      {
        title: title,
        description: description,
        content: content,
        avatar: avatar,
        status: status,
        updatedAt: updatedAt
      }
    )
    res.status(201).json("Chỉnh sửa bài viết thành công");
  } catch (err) {
    return Promise.reject(err);
  }
})

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.status(201).json("Xóa bài viết thành công");
});

async function validateArticle(req, res) {
  const { title, description, content, avatar, status, categoryId } = req.body;
  const slugArticle = slugify(title, { lower: true, strict: true })

  if (!title || !description || !content || !avatar || !status) {
    throw res.status(300).json('Vui lòng điền đầy đủ thông tin');
  }

  if (status != constants.DRAFT && status != constants.PUBLIC) {
    throw res.status(300).json('Vui lòng nhập đúng status');
  }

  const oldArticle = await Article.findOne({ slug: slugArticle });
  const category = await Category.findOne({ _id: categoryId });
  if (oldArticle) {
    throw res.status(300).json('Đã tồn tại tiêu đề này, vui lòng nhập tiêu đề khác');
  }
  if (!category) {
    throw res.status(300).json('Vui lòng chọn đúng danh mục');
  }
}

module.exports = router;