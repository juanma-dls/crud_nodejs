class auth{
    static isLoggedIn(request, response, next){
        // Usamos un método de passport que devuelve un boolean si hay un usuario logeado
        if (request.isAuthenticated()) {
            return next();
        }
        return response.redirect('/');
    };

    static isNotLoggedIn(request, response, next){
        if (!request.isAuthenticated()) {
            return next();
        }
        return response.redirect('/')
    };
}

export default auth