import { request, response, Router } from "express";
import { UserController } from "../controllers/UserController";


const routerUser = Router();
const userController = new UserController();



routerUser.get("/users", userController.list);
routerUser.get("/addUser", (request, response) => {
  response.render("User/add");
});
routerUser.post("/add-user", userController.create);
routerUser.get("/searchUser", userController.search);
routerUser.get("/editUser", userController.getData);
routerUser.post("/edit-user", userController.update);
routerUser.post("/delete-user", userController.delete);

export { routerUser };
