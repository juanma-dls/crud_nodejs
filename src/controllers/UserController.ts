import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  async create(request: Request, response: Response) {
    const { username, password,email, phone, city, state } = request.body;

    const createUserService = new UserService();

    try {
      await createUserService.create({
        username,
        password,
        email,
        phone,
        city,
        state
      }).then(() => {
        response.render("User/message", {
          message: "Usuario creado con éxito"
        });
      });
    } catch (err) {
      response.render("User/message", {
        message: `Error al crear usuario: ${err.message}`
      });
    }
  }
  
  async delete(request: Request, response: Response) {
    const { id } = request.body;

    const deleteUserService = new UserService();

    try {
      await deleteUserService.delete(id).then(() => {
        response.render("User/message", {
          message: "Usuario eliminado con éxito"
        });
      });
    } catch (err) {
      response.render("User/message", {
        message: `Error al eliminar usuario: ${err.message}`
      });
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
      response.render("User/message", {
        message: `Error al buscar usuario: ${err.message}`
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id, username, password, email, phone, city, state } = request.body;

    const updateUserService = new UserService();

    try {
      await updateUserService.update({ id, username, password, email, phone, city, state }).then(() => {
        response.render("User/message", {
          message: "Usuario actualizado con éxito"
        });
      });
    } catch (err) {
      response.render("User/message", {
        message: `Error al actualizar usuario: ${err.message}`
      });
    }
  }
}

export { UserController };