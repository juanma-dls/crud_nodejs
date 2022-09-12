import { request, response, Router } from "express";


const router = Router();

router.get("/", (request, response)  => {
  response.render("../views/home");
});


export { router };
