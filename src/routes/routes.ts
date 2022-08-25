import { request, response, Router } from "express";


const router = Router();

router.get("/home", (req, res)  => {
  res.render("home")
});

router.get("/", (req, res)  => {
  res.render("Login/signin")
});

export { router };
