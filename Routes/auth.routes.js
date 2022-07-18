const { Router } = require("express");
const UserModel = require("../models/UserSchema");

const authRouter = Router();

//signup
authRouter.post('/signup', async (req, res) => {
    const user = await new UserModel(req.body);
    user.save((err, success) => {
        if (err) {
            return res.status(500).send({ message: "Internal server error occurred" })
        }
        return res.status(201).send({ message: "Sign up success", token: 54321 })
    })
})

//login
authRouter.post('/login', async (req, res) => {
    const isUserPresent = await UserModel.find(req.body);
    if (isUserPresent.length >= 1) {
        let { name, _id } = isUserPresent[0];
        const payload = {
            _id,
            name,
            token: 54321
        }
        return res.status(201).send(payload)
    }
    return res.send({ message: "Wrong credentials" })
})

module.exports = authRouter;