import { Request, Response } from "express";
import ApplicantService from "../services/ApplicantService";


class ApplicantController {
  async create(request: Request, response: Response) {
    const { name, lastname, dni, province, city } = request.body;

    const createApplicantService = new ApplicantService();

    try {
      await createApplicantService.create({
        name, 
        lastname, 
        dni, 
        province, 
        city
      }).then(() => {
        request.flash("success","Solicitante creado exitosamente");
          response.redirect("./applicants");
      });
    } catch (err) {
      request.flash("error","Error al crear solicitante"), err;
        response.redirect("./applicants");
        console.error(err)
    }
  }
  
  async delete(request: Request, response: Response) {
    const { id } = request.body;

    const deleteApplicantService = new ApplicantService();

    try {
      await deleteApplicantService.delete(id).then(() => {
        request.flash("success","Solicitante eliminado exitosamente");
          response.redirect("./applicants");
      });
    } catch (err) {
      request.flash("error","Error al eliminar solicitante", err);
      console.error (err)
        response.redirect("./applicants");
    }
  }

  async getData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getApplicantDataService = new ApplicantService();

    const applicant = await getApplicantDataService.getData(id);

    return response.render("Applicant/edit", {
      applicant: applicant
    });
  }

  async list(request: Request, response: Response) {
    const listApplicantsService = new ApplicantService();

    const applicants = await listApplicantsService.list();

    return response.render("Applicant/index", {
      applicants: applicants
    });
  }

  async search(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchApplicantService = new ApplicantService();

    try {
      const applicants = await searchApplicantService.search(search);
      response.render("Applicant/search", {
        applicants: applicants,
        search: search
      });
    } catch (err) {
      request.flash("error","Error al buscar solicitante"), err;
        response.redirect("./applicants");
    }
  }

  async update(request: Request, response: Response) {
    const { id, name, lastname, dni, province, city } = request.body;

    const updateApplicantService = new ApplicantService();

    try {
      await updateApplicantService.update({ id, name, lastname, dni, province, city }).then(() => {
        request.flash("success","Solicitante actualizado exitosamente");
        response.redirect("./applicants");
      });
    } catch (err) {
      request.flash("error","Error al actualizar solicitante"), err;
        response.redirect("./applicants");
    }
  }
}

export { ApplicantController };