import { Request, Response } from "express";
import CategoryService, { categoryService } from "../services/CategoryService";
import ProductService from "../services/ProductService";

class ProductController {
  async create(request: Request, response: Response) {
    const { productname, price, type, categoryId } = request.body;

    const createProductService = new ProductService();

    try {
      await createProductService.create({
        productname,
        price,
        type,
        categoryId
      }).then(() => {
        request.flash("success","Producto creado exitosamente");
          response.redirect("./products");
      });
    } catch (err) {
      request.flash("error","Error al crear producto"), err;
        response.redirect("./products");
    }
  }

  async add(request: Request,response: Response){
    const category = await categoryService.list();
    return response.render("Product/add",{category})
  }

  async delete(request: Request, response: Response) {
    const { id } = request.body;

    const deleteUserService = new ProductService();

    try {
      await deleteUserService.delete(id).then(() => {
        request.flash("success","Producto eliminado exitosamente");
          response.redirect("./products");
      });
    } catch (err) {
      request.flash("error","Error al eliminar producto"), err;
        response.redirect("./products");
    }
  }

  async getData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getProductDataService = new ProductService();

    const product = await getProductDataService.getData(id);
    const listCategory = new CategoryService()

    const category = await listCategory.list()
    return response.render("Product/edit", {
      product: product,
      category: category
    });
  }

  async list(request: Request, response: Response) {
    const listProductsService = new ProductService();

    const product = await listProductsService.list();
    const listCategory = new CategoryService()

    const category = await listCategory.list()
    return response.render("Product/index", {
      product: product,
      category: category
    });
  }

  async search(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchProductService = new ProductService();

    try {
      const product = await searchProductService.search(search);
      response.render("Product/search", {
        product: product,
        search: search
      });
    } catch (err) {
      request.flash("error","Error al buscar producto"), err;
        response.redirect("./products");
    }
  }

  async update(request: Request, response: Response) {
    const { id, productname, price, type, categoryId } = request.body;

    const updateProductService = new ProductService();

    try {
      await updateProductService.update({ id, productname, price, type, categoryId }).then(() => {
        request.flash("success","Producto actualizado exitosamente");
          response.redirect("./products");
      });
    } catch (err) {
      request.flash("error","Error al actualizar producto"), err;
        response.redirect("./products");
    }
  }
}

export { ProductController };