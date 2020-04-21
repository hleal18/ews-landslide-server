import Config from './config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import bcrypt from 'bcrypt';

import IUser from '../domain/IUser';
import UsersManager from '../service/UsersManager';


passport.use('local', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false
}, async (email, password, done) => {
    try {
        const user: IUser | null = await UsersManager.getUserByEmail(email);
        if (!user) return done(null, false);
        else if (!bcrypt.compareSync(password, user.password as string)) return done(null, false);
        else return done(null, user);
    } catch (e) {
        console.log('Error: ', e);
        return done(e, null);
    }
}));


let opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Config.auth.jwt_secret,
    algorithms: [Config.auth.jwt_algorithm]
}

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        console.log('Payload: ', jwt_payload);
        return done(null, jwt_payload, { id: jwt_payload.id });
    } catch (e) {
        console.log(`Error: ${e.message}`);
        done(e);
    }
}));