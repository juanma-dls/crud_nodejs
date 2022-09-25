import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import auth from "../lib/auth";

const routerOrder = Router();
const orderController = new OrderController();

routerOrder.get("/orders", auth.isLoggedIn, orderController.list);
routerOrder.get("/addOrder", auth.isLoggedIn,  orderController.add);
routerOrder.post("/add-order", auth.isLoggedIn, orderController.create);
routerOrder.get("/searchOrder", auth.isLoggedIn, orderController.search);
routerOrder.get("/editOrder", auth.isLoggedIn, orderController.getData);
routerOrder.post("/edit-order", auth.isLoggedIn, orderController.update);
routerOrder.post("/delete-order", auth.isLoggedIn, orderController.delete);

export { routerOrder }