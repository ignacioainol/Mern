import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler'
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const { _id, name, email, isAdmin } = user;
                res.send({
                    _id,
                    name,
                    email,
                    isAdmin,
                    token: generateToken(user)
                });
                return;
            }
        }

        res.status(401).send({ message: 'Invalid email or Password' });
    })
)

export default userRouter;