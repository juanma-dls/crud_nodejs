import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";

class CategoryController {
  async create(request: Request, response: Response) {
    const { name } = request.body;

    const createCategoryService = new CategoryService();

    try {
      await createCategoryService.create({
        name
      }).then(() => {
        response.render("Category/message", {
          message: "Categoria creada con éxito"
        });
      });
    } catch (err) {
      response.render("Category/message", {
        message: `Error al crear categoría: ${err.message}`
      });
    }
  }
  
  async delete(request: Request, response: Response) {
    const { id } = request.body;

    const deleteCategoryService = new CategoryService();

    try {
      await deleteCategoryService.delete(id).then(() => {
        response.render("Category/message", {
          message: "Categoría eliminado con éxito"
        });
      });
    } catch (err) {
      response.render("Category/message", {
        message: `Error al eliminar categoría: ${err.message}`
      });
    }
  }

  async getData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getCategoryDataService = new CategoryService();

    const category = await getCategoryDataService.getData(id);

    return response.render("Category/edit", {
      category: category
    });
  }

  async list(request: Request, response: Response) {
    const listCategorysService = new CategoryService();

    const category = await listCategorysService.list();

    return response.render("Category/index", {
      category: category
    });
  }

  async search(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchCategoryService = new CategoryService();

    try {
      const categories = await searchCategoryService.search(search);
      response.render("Category/search", {
        categories: categories,
        search: search
      });
    } catch (err) {
      response.render("Category/message", {
        message: `Error al buscar categoría: ${err.message}`
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id, name } = request.body;

    const updateCategoryrService = new CategoryService();

    try {
      await updateCategoryrService.update({ id, name }).then(() => {
        response.render("Category/message", {
          message: "Categoría actualizado con éxito"
        });
      });
    } catch (err) {
      response.render("Category/message", {
        message: `Error al actualizar categoría: ${err.message}`
      });
    }
  }
}

export { CategoryController };