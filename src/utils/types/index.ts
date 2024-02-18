interface IUser {
    id: string;
    plan: string;
}

namespace Express {
    interface Request {
        user: IUser;
    }
}