import express from "express";
import passport, { authorize } from "passport"
import auth from "../lib/auth";

const routerLogin = express.Router();
// SIGNUP (registrarse)
routerLogin.get('/signup', auth.isNotLoggedIn, (request, response) => {
    response.render('Login/signup');
});
  
routerLogin.post('/signup', auth.isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: "/signin",
    failureRedirect: '/signup',
    failureFlash: true
}));

  
// SINGIN (iniciar sesion)
routerLogin.get('/signin', auth.isNotLoggedIn, (request, response) => {
    response.render('Login/signin');
});
  
routerLogin.post('/signin', auth.isNotLoggedIn, (request, response, next) => {
    passport.authenticate('local.signin', {
      successRedirect: "/",
      failureRedirect: '/signin',
      failureFlash: true
    })(request, response, next);
});


//salir de la sesión
routerLogin.get('/logout', (request, response, next) =>{
    // @ts-ignore
    request.logOut();
    response.redirect('/')

    });
  

export {routerLogin};
