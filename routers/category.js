const express = require('express');
const router = express.Router();
const lodash = require('lodash');
require("dotenv").config();
const constants = require("../utils/constants");
const Category = require('../models/category');
const Article = require('../models/article');
const auth = require("../middleware/auth");

router.post('/create', async (req, res) => {
  try {
    const { name, avatar} = req.body;
    const category = await Category.create(
      {
        name: name,
        avatar: avatar,
      }
    )
    res.status(201).json(category);
  } catch (err) {
    return Promise.reject(err);
  }
})

router.get('/news/:categoryId', async (req, res) => {
  const category = req.params.categoryId;
  try {
      const articles = await Article.find({ category: category }).sort({
        createdAt: 'desc'
      })
      res.status(201).json(articles);
  } catch (err) {
    return Promise.reject(err);
  }
})

module.exports = router;