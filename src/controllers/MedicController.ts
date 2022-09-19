import { Request, Response } from "express";
import MedicService from "../services/MedicService";


class MedicController {
  async create(request: Request, response: Response) {
    const { name, lastname, specialty, tuition } = request.body;

    const createMedicService = new MedicService();

    try {
      await createMedicService.create({
        name,
        lastname,
        specialty,
        tuition
      }).then(() => {
        request.flash("success","Médico creado exitosamente");
          response.redirect("./medics");
      });
    } catch (err) {
      request.flash("error","Error al crear médico", err);
          response.redirect("./medics");
    }
  }
  
  async delete(request: Request, response: Response) {
    const { id } = request.body;

    const deleteMedicService = new MedicService();

    try {
      await deleteMedicService.delete(id).then(() => {
        request.flash("success","Médico eliminado exitosamente");
          response.redirect("./medics");
      });
    } catch (err) {
      request.flash("error","Error al eliminar médico", err);
          response.redirect("./medics");
    }
  }

  async getData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getMedicDataService = new MedicService();

    const medic = await getMedicDataService.getData(id);

    return response.render("Medic/edit", {
      medic: medic
    });
  }

  async list(request: Request, response: Response) {
    const listMedicsService = new MedicService();

    const medics = await listMedicsService.list();

    return response.render("Medic/index", {
      medics: medics
    });
  }

  async search(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchMedicService = new MedicService();

    try {
      const medics = await searchMedicService.search(search);
      response.render("Medic/search", {
        medics: medics,
        search: search
      });
    } catch (err) {
      request.flash("error","Error al buscar médico"), err;
          response.redirect("./medics");
    }
  }

  async update(request: Request, response: Response) {
    const { id, name, lastname, specialty, tuition } = request.body;

    const updateMedicrService = new MedicService();

    try {
      await updateMedicrService.update({ id, name, lastname, specialty,tuition }).then(() => {
        request.flash("success","Médico actualizado exitosamente");
          response.redirect("./medics");
      });
    } catch (err) {
      request.flash("error","Error al actualizar médico"), err;
          response.redirect("./medics");
    }
  }
}

export { MedicController };