import mongoose from 'mongoose';
import IUser from '../domain/IUser';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export interface IUserDocument extends IUser, mongoose.Document { };

export default mongoose.model<IUserDocument>('Users', UserSchema);