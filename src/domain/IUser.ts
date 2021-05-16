interface IUser {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    emailsToNotify?: String[];
}

export default IUser;
