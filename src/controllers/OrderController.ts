import { Request, Response } from "express";
import { applicantService } from "../services/ApplicantService";
import OrderService from "../services/OrderService";
import ProductService, { productService } from "../services/ProductService";
import UserService, { userService } from "../services/UserService";

class OrderController {
  async create(request: Request, response: Response) {
    const { numOrder, description, product_id, applicant_id, user_id } = request.body;

    const createOrderService = new OrderService();

    try {
      await createOrderService.create({
        numOrder,
        description,
        product_id,
        applicant_id,
        user_id
      }).then(() => {
        request.flash("success","Pedido creado exitosamente");
          response.redirect("./orders");
      });
    } catch (err) {
      request.flash("error","Error al crear pedido", err);
      console.log(request.body)
        response.redirect("./orders");
    }
  }

  async add(request: Request,response: Response){
    const product = await productService.list();
    const applicant = await applicantService.list()
    const user = await userService.list()
    return response.render("Order/add",{product, applicant, user})
  }

  async delete(request: Request, response: Response) {
    const { id } = request.body;

    const deleteOrderService = new OrderService();

    try {
      await deleteOrderService.delete(id).then(() => {
        request.flash("success","Pedido eliminado exitosamente");
          response.redirect("./orders");
      });
    } catch (err) {
      request.flash("error","Error al eliminar pedido"), err;
        response.redirect("./orders");
    }
  }

  async getData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getOrderDataService = new OrderService();

    const orders = await getOrderDataService.getData(id);

    const product = await productService.list()
    const applicant = await applicantService.list()
    const user = await userService.list()
    return response.render("Order/edit", {
      orders: orders,
      product: product,
      applicant: applicant,
      user: user
    });
  }

  async list(request: Request, response: Response) {
    const listOrdersService = new OrderService();

    const order = await listOrdersService.list();
  
    const product = await productService.list()
    const applicant = await applicantService.list()
    const user = await userService.list()
    return response.render("Order/index", {
      order: order,
      product: product,
      applicant: applicant,
      user: user
    });
  }

  async search(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchOrderService = new OrderService();

    try {
      const order = await searchOrderService.search(search);
      response.render("Order/search", {
        order: order,
        search: search
      });
    } catch (err) {
      request.flash("error","Error al buscar pedido"), err;
        response.redirect("./orders");
    }
  }

  async update(request: Request, response: Response) {
    const { id, numOrder, description, product_id, applicant_id, user_id } = request.body;

    const updateOrderService = new OrderService();

    try {
      await updateOrderService.update({ id, numOrder, description, product_id, applicant_id, user_id }).then(() => {
        request.flash("success","Pedido actualizada exitosamente");
          response.redirect("./orders");
      });
    } catch (err) {
      request.flash("error","Error al actualizar pedido"), err;
        response.redirect("./orders");
    }
  }
}

export { OrderController };