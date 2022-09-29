import { request, response, Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import auth from "../lib/auth";

const routerCategory = Router();
const categoryController = new CategoryController();

routerCategory.get("/category", auth.isLoggedIn, categoryController.list);
routerCategory.get("/addCategory", auth.isLoggedIn, (request, response) => {
  response.render("Category/add")
});
routerCategory.post("/add-category", auth.isLoggedIn, categoryController.create);
routerCategory.get("/searchCategory", auth.isLoggedIn, categoryController.search);
routerCategory.get("/editCategory", auth.isLoggedIn, categoryController.getData);
routerCategory.post("/edit-category", auth.isLoggedIn, categoryController.update);
routerCategory.post("/delete-category", auth.isLoggedIn, categoryController.delete);

export { routerCategory };