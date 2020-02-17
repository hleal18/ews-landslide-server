import IUser from '../domain/IUser';
import UserRecordManager from '../persistence/UsersRecordManager';

export default class UsersManager {
    static async addUser(user: IUser): Promise<IUser> {
        const result: IUser = await UserRecordManager.addUser(user);
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