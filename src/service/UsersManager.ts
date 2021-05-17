import Config from '../config/config';
import IUser from '../domain/IUser';
import UserRecordManager from '../persistence/UsersRecordManager';

import bcrypt from 'bcrypt';

export default class UsersManager {
    static async addUser(user: IUser): Promise<IUser> {
        const duplicate: IUser | null =
            await UserRecordManager.getUserByEmail(user.email);

        if (duplicate) throw new Error(`User provided with email ${user.email} already in use.`);

        const userToCreate: IUser = { ...user };

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

    static async modifyUserById(id: String, update: Partial<IUser>): Promise<IUser | null> {
        const originalUser = await UsersManager.getUserById(id);
        if (originalUser) {
            const updateOriginalEmail = update.email ? update.email !== originalUser.email : false;
            if (updateOriginalEmail) throw new Error(`Email no puede ser modificado`);
            return UserRecordManager.modifyUserById(id, update);
        }
        
        return null;
    }
}