import { request, response, Router } from "express";
import auth from "../lib/auth";


const router = Router();

router.get("/", (request, response)  => {
  response.render("../views/home");
});

router.get("/profile", auth.isLoggedIn, (request,response) => {
  response.render("../views/profile")
})


export { router };
