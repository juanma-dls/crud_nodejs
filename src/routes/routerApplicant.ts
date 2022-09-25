import { Router } from "express";
import { ApplicantController } from "../controllers/ApplicantController";
import auth from "../lib/auth";

const routerApplicant = Router()
const applicantController = new ApplicantController()

routerApplicant.get("/applicants", auth.isLoggedIn, applicantController.list);
routerApplicant.get("/addApplicant", auth.isLoggedIn, (request, response) => {
  response.render("Applicant/add")
});
routerApplicant.post("/add-applicant", auth.isLoggedIn, applicantController.create);
routerApplicant.get("/searchApplicant", auth.isLoggedIn, applicantController.search);
routerApplicant.get("/editApplicant", auth.isLoggedIn, applicantController.getData);
routerApplicant.post("/edit-applicant", auth.isLoggedIn, applicantController.update);
routerApplicant.post("/delete-applicant", auth.isLoggedIn, applicantController.delete);

export { routerApplicant }