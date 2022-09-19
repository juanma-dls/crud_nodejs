import express from "express";
import passport from "passport"
import auth from "../lib/auth";

const routerAuth = express.Router();
// SIGNUP (registrarse)
routerAuth.get('/signup', (request, response) => {
    response.render('Login/signup');
});

routerAuth.post('/signup', passport.authenticate('local.signup', {
    successRedirect: "/home",
    failureRedirect: '/signup',
    failureFlash: true
}));


// SINGIN (iniciar sesion)
routerAuth.get('/signin', (request, response) => {
    response.render('Login/signin');
});

routerAuth.post('/signin', (request, response, next) => {
    passport.authenticate('local.signin', {
      successRedirect: "/home",
      failureRedirect: '/signin',
      failureFlash: true
    })(request, response, next);
});


//salir de la sesión
routerAuth.get('/logout', (request, response, next) =>{

    request.logout((err: any) => next());
    response.redirect('/signin');

  });


export {routerAuth};
