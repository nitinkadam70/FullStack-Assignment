const { Router } = require("express")
const ArticleModel = require("../models/ArticlesSchema")

const articleRouter = Router();

//getting particular user aritcles
articleRouter.get("/:userId/articles", async (req, res) => {
    let userId = req.params;
    let ariticle = await ArticleModel.find(userId)
    return res.send(ariticle)
})

//getting all submisions
articleRouter.get("/articles", async (req, res) => {
    let ariticle = await ArticleModel.find({}, { _id, userId })
    return res.send(ariticle)
})

articleRouter.post("/:userId/articles", async (req, res) => {
    const userId = req.params.userId; //here we get userId from params 
    let payload = {
        ...req.body,
        userId
    }
    let ariticle = await new ArticleModel(payload);
    ariticle.save((err, success) => {
        if (err) {
            return res.status(500).send({ message: "something went wrong" });
        }
        return res.status(201).send(success) //success is whole payload that we have with userId
    })
})


articleRouter.patch("/:userId/task/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateTask = await ArticleModel.findByIdAndUpdate(_id, req.body);
        return res.send(updateTask)
    }
    catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = articleRouter;