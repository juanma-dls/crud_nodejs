import { request, response, Router } from "express";
import { ProductController } from "../controllers/ProductController";


const routerProduct = Router();
const productController = new ProductController();

routerProduct.get("/products", productController.list);
routerProduct.get("/addProduct",  productController.add);
routerProduct.post("/add-product", productController.create);
routerProduct.get("/searchProduct", productController.search);
routerProduct.get("/editProduct", productController.getData);
routerProduct.post("/edit-product", productController.update);
routerProduct.post("/delete-product", productController.delete);


export { routerProduct };