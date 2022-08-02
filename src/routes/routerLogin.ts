import express from "express";
import passport from "passport"
import { Authoricer } from "../lib/auth";

const routerLogin = express.Router();
// SIGNUP (registrarse)
routerLogin.get('/signup', (request, response) => {
    response.render('Login/signup');
});
  
routerLogin.post('/signup', passport.authenticate('local.signup', {
    successRedirect: "/",
    failureRedirect: '/signup',
    failureFlash: true
}));

  
// SINGIN (iniciar sesion)
routerLogin.get('/signin', (request, response) => {
    response.render('Login/signin');
});
  
routerLogin.post('/signin', (request, response, next) => {
    passport.authenticate('local.signin', {
      successRedirect: "/home",
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
  
routerLogin.get("/home", Authoricer.isNotLoggedIn, (request, response) => {
    response.render('/');
});

export {routerLogin};
