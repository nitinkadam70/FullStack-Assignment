const mongoose = require("mongoose");

const articlesSchema = mongoose.Schema({
    articleTitle: { type: String, require: true },
    status: { type: Boolean, default: false },
    userId: { type: String, require: true },
    autherName: { type: String, require: true },
    autherName: { type: String, require: true },
    submissionTime: { type: String, require: true },
    timeSinceSubmission: { type: String, require: true }
})

const ArticleModel = mongoose.model("articles", articlesSchema)

module.exports = ArticleModel;