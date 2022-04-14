import { request, response, Router } from "express";


const router = Router();

router.get("/home", (req, res)  => {
  res.render("home")
});

router.get("/singup", (req, res)  => {
  res.render("Login/singup")
});

router.get("/", (req, res)  => {
  res.render("Login/singup")
});
export { router };
