import Config from '../config/config'
import IUser from '../domain/IUser';
import UsersManager from '../service/UsersManager';
import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

async function addUser(req: Request, res: Response) {
    const user: IUser = req.body.user;
    try {
        const { firstName, lastName, email, password } = user;
        console.log('User: ', user);
        if (!user) return res.status(404).send({ message: `No user provided` });
        else if (!firstName || !lastName || !email || !password) return res.status(404).send({ message: `Some fields are missing, check User structure` });

        const newUser = await UsersManager.addUser(user);

        if (!newUser) throw new Error(`User could not be saved, check User structure.`);

        return res.status(200).send({ user: newUser });
    } catch (e) {
        return res.status(404).send({ message: `There was an error: ${e.message}` });
    }
}

async function login(req: Request, res: Response) {
    const { body: { email, password } } = req;
    try {
        passport.authenticate('local', { session: false }, async (error, user) => {
            const payload = {
                id: user._id,
                iat: Date.now() + Config.auth.jwt_expiration,
                email: user.email
            }

            if (!user) return res.status(404).send({ message: `Invalid user or password` });

            const token = jwt.sign(JSON.stringify(payload), Config.auth.jwt_secret as jwt.Secret, { algorithm: Config.auth.jwt_algorithm } as jwt.SignOptions);
            return res.status(200).send({ auth: { token }, user });
        })(req, res);

    } catch (e) {
        res.status(404).send({ message: `There was an error: ${e.message}` });
    }
}

async function getUser(req: Request, res: Response) {
    const userId = req.authInfo.id;
    console.log(`UserId for route GET USER: ${userId}`);

    try {
        const user = await UsersManager.getUserById(userId);

        if (!user) return res.status(404).send({ message: `User not found` });

        return res.status(200).send({ user });
    } catch (e) {
        return res.status(404).send({ message: `There was an error ${e.message}` });
    }
}

export default {
    addUser: addUser,
    login: login,
    getUser
}