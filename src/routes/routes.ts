import { request, response, Router } from "express";
import auth from "../lib/auth";


const router = Router();

router.get("/home", auth.isLoggedIn, (request, response)  => {
  response.render("home");
});

router.get("/", (request, response) => {
  response.render("Login/signin")
})


export { router };
