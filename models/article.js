const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: [
      '235c6194-ee49-11ec-8ea0-0242ac120002', // DRAFT
      '2778fa08-ee49-11ec-8ea0-0242ac120002', // PUBLIC
    ],
  },
  updatedAt: { type: Date, default: Date.now }
});

ArticleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next();
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;