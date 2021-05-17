import IUser from '../domain/IUser';
import Users from './User';

export default class UsersRecordManager {
    static async addUser(user: IUser): Promise<IUser> {
        const result: IUser = await Users.create(user);
        return result;
    }

    static async getUserByEmail(email: String): Promise<IUser | null> {
        const result: IUser | null = await Users.findOne({ email });
        return result;
    }

    static async getUserById(id: String): Promise<IUser | null> {
        const result: IUser | null = await Users.findOne({ _id: id });
        return result;
    }

    static async modifyUserById(id: String, update: Partial<IUser>): Promise<IUser | null> {
        const result: IUser | null = await Users.findOneAndUpdate({ _id: id }, update, { new: true });
        return result;
    }
}