import { request, response, Router } from "express";
import { ProductController } from "../controllers/ProductController";
import auth from "../lib/auth";


const routerProduct = Router();
const productController = new ProductController();

routerProduct.get("/products", auth.isLoggedIn, productController.list);
routerProduct.get("/addProduct", auth.isLoggedIn,  productController.add);
routerProduct.post("/add-product", auth.isLoggedIn, productController.create);
routerProduct.get("/searchProduct", auth.isLoggedIn, productController.search);
routerProduct.get("/editProduct", auth.isLoggedIn, productController.getData);
routerProduct.post("/edit-product", auth.isLoggedIn, productController.update);
routerProduct.post("/delete-product", auth.isLoggedIn, productController.delete);


export { routerProduct };