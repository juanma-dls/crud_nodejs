import {User} from "../entities/User"

export class Authoricer{
    static isLoggedIn (request, response, next): any {
        if (request.isAuthenticated(User)) {
            return next();
        }
        return response.redirect('/home');
    }
    static isNotLoggedIn (require, response, next): any{
        if (!require.isAuthenticated()) {
            return next();
        }
        return response.redirect('/signin');
    }
};