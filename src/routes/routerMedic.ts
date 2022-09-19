import { request, response, Router } from "express";
import { MedicController } from "../controllers/MedicController";
import auth from "../lib/auth";

const routerMedic = Router();
const medicController = new MedicController();

routerMedic.get("/medics", auth.isLoggedIn, medicController.list);
routerMedic.get("/addMedic", auth.isLoggedIn, (request, response) => {
    response.render("Medic/add");
});
routerMedic.post("/add-medic", auth.isLoggedIn, medicController.create);
routerMedic.get("/searchMedic", auth.isLoggedIn, medicController.search);
routerMedic.get("/editMedic", auth.isLoggedIn, medicController.getData);
routerMedic.post("/edit-medic", auth.isLoggedIn, medicController.update);
routerMedic.post("/delete-medic", auth.isLoggedIn, medicController.delete);

export { routerMedic }