import { request, response, Router } from "express";
import { UserController } from "../controllers/UserController";
import auth from "../lib/auth";


const routerUser = Router();
const userController = new UserController();



routerUser.get("/users", auth.isLoggedIn, userController.list);
routerUser.get("/addUser", auth.isLoggedIn, (request, response) => {
  response.render("User/add");
});
routerUser.post("/add-user", auth.isLoggedIn, userController.create);
routerUser.get("/searchUser", auth.isLoggedIn, userController.search);
routerUser.get("/editUser", auth.isLoggedIn, userController.getData);
routerUser.post("/edit-user", auth.isLoggedIn, userController.update);
routerUser.post("/delete-user", auth.isLoggedIn, userController.delete);

export { routerUser };
