import Config from '../config/config';
import IUser from '../domain/IUser';
import UserRecordManager from '../persistence/UsersRecordManager';

import bcrypt from 'bcrypt';

export default class UsersManager {
    static async addUser(user: IUser): Promise<IUser> {
        const duplicate: IUser | null =
            await UserRecordManager.getUserByEmail(user.email);

        let result: IUser | null = null;

        const userToCreate = user;

        userToCreate.password = bcrypt.hashSync(user.password, Config.auth.bcryptRounds);

        if (!duplicate) result = await UserRecordManager.addUser(userToCreate);
        else
            throw new Error(`User provided with email ${user.email} already in use.`);

        return result;
    }

    static async getUserByEmail(email: String): Promise<IUser | null> {
        const result: IUser | null = await UserRecordManager.getUserByEmail(email);
        return result;
    }

    static async getUserById(id: String): Promise<IUser | null> {
        const result: IUser | null = await UserRecordManager.getUserById(id);
        return result;
    }
}