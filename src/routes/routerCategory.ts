import { request, response, Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

const routerCategory = Router();
const categoryController = new CategoryController();

routerCategory.get("/category", categoryController.list);
routerCategory.get("/addCategory", (req, res) => {
  res.render("Category/add")
});
routerCategory.post("/add-category", categoryController.create);
routerCategory.get("/searchCategory", categoryController.search);
routerCategory.get("/editCategory", categoryController.getData);
routerCategory.post("/edit-category", categoryController.update);
routerCategory.post("/delete-category", categoryController.delete);

export { routerCategory };