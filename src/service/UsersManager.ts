import Config from '../config/config';
import IUser from '../domain/IUser';
import UserRecordManager from '../persistence/UsersRecordManager';

import bcrypt from 'bcrypt';

export default class UsersManager {
    static async addUser(user: IUser): Promise<IUser> {
        const duplicate: IUser | null =
            await UserRecordManager.getUserByEmail(user.email);

        if (duplicate) throw new Error(`User provided with email ${user.email} already in use.`);

        const userToCreate: IUser = {...user, emailsToNotify: [user.email] };

        userToCreate.password = bcrypt.hashSync(user.password, Config.auth.bcryptRounds);

        const result: IUser = await UserRecordManager.addUser(userToCreate);

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