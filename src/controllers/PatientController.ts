import { Request, Response } from "express";
import PatientService from "../services/PatientService";



class PatientController {
  async create(request: Request, response: Response) {
    const { name, lastname, dni, sexo, obraSocial } = request.body;

    const createMedicService = new PatientService();

    try {
      await createMedicService.create({
        name,
        lastname,
        dni, 
        sexo, 
        obraSocial
      }).then(() => {
        request.flash("success","Paciente creado exitosamente");
        response.redirect("./patients");
      });
    } catch (err) {
        request.flash("error","Error al crear paciente", err);
        response.redirect("./patients");
    }
  }
  
  async delete(request: Request, response: Response) {
    const { id } = request.body;

    const deletePatientService = new PatientService();

    try {
      await deletePatientService.delete(id).then(() => {
        request.flash("success","Paciente eliminado exitosamente");
          response.redirect("./patients");
      });
    } catch (err) {
      request.flash("error","Error al eliminar paciente", err);
          response.redirect("./patients");
    }
  }

  async getData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getPatientDataService = new PatientService();

    const patient = await getPatientDataService.getData(id);

    return response.render("Patient/edit", {
      patient: patient
    });
  }

  async list(request: Request, response: Response) {
    const listPatientsService = new PatientService();

    const patients = await listPatientsService.list();

    return response.render("Patient/index", {
      patients: patients
    });
  }

  async search(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchPatientService = new PatientService();

    try {
      const patients = await searchPatientService.search(search);
      response.render("Patient/search", {
        patients: patients,
        search: search
      });
    } catch (err) {
      request.flash("error","Error al buscar paciente"), err;
          response.redirect("./patients");
    }
  }

  async update(request: Request, response: Response) {
    const { id, name, lastname, dni, sexo, obraSocial } = request.body;

    const updatePatientService = new PatientService();

    try {
      await updatePatientService.update({ id, name, lastname, dni, sexo, obraSocial }).then(() => {
        request.flash("success","Paciente actualizado exitosamente");
          response.redirect("./medics");
      });
    } catch (err) {
      request.flash("error","Error al actualizar paciente"), err;
          response.redirect("./medics");
    }
  }
}

export { PatientController };