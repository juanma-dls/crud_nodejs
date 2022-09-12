import { Request, Response } from "express";
import { helpers } from "../lib/helpers";
import UserService from "../services/UserService";

class UserController {
  async create(request: Request, response: Response) {
    const { name, lastname, username, password,email, phone } = request.body;

    const createUserService = new UserService();

    try {
      await createUserService.create({
        name, 
        lastname, 
        username,
        password: await helpers.encryptPassword(password),
        email,
        phone
      }).then(() => {
        request.flash("success","Usuario creado exitosamente");
          response.redirect("./users");
      });
    } catch (err) {
      request.flash("error","Error al crear usuario"), err;
        response.redirect("./users");
    }
  }
  
  async delete(request: Request, response: Response) {
    const { id } = request.body;

    const deleteUserService = new UserService();

    try {
      await deleteUserService.delete(id).then(() => {
        request.flash("success","Usuario eliminado exitosamente");
          response.redirect("./users");
      });
    } catch (err) {
      request.flash("error","Error al eliminar usuario"), err;
        response.redirect("./users");
    }
  }

  async getData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getUserDataService = new UserService();

    const user = await getUserDataService.getData(id);

    return response.render("User/edit", {
      user: user
    });
  }

  async list(request: Request, response: Response) {
    const listUsersService = new UserService();

    const users = await listUsersService.list();

    return response.render("User/index", {
      users: users
    });
  }

  async search(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchUserService = new UserService();

    try {
      const users = await searchUserService.search(search);
      response.render("User/search", {
        users: users,
        search: search
      });
    } catch (err) {
      request.flash("error","Error al buscar usuario"), err;
        response.redirect("./users");
    }
  }

  async update(request: Request, response: Response) {
    const { id, name, lastname, username, password, email, phone } = request.body;

    const updateUserService = new UserService();

    try {
      await updateUserService.update({ id, name, lastname, username, password, email, phone }).then(() => {
        request.flash("success","Usuario actualizado exitosamente");
        response.redirect("./users");
      });
    } catch (err) {
      request.flash("error","Error al actualizar usuario"), err;
        response.redirect("./users");
    }
  }
}

export { UserController };