import { application, request, response, Router } from "express";
import { PatientController } from "../controllers/PatientController";
import auth from "../lib/auth";

const routerPatient = Router()
const patientController = new PatientController()

routerPatient.get("/patients", auth.isLoggedIn, patientController.list)
routerPatient.get("/addPatient", auth.isLoggedIn, (request, response) => {
    response.render("Patient/add")
})
routerPatient.post("/add-patient", auth.isLoggedIn, patientController.create);
routerPatient.get("/searchPatient", auth.isLoggedIn, patientController.search);
routerPatient.get("/editPatient", auth.isLoggedIn, patientController.getData);
routerPatient.post("/edit-patient", auth.isLoggedIn, patientController.update);
routerPatient.post("/delete-patient", auth.isLoggedIn, patientController.delete);

export { routerPatient } 