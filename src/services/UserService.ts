import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
  id?:number
  name:string,
  lastname:string,
  username: string;
  password?: string;
  email: string;
  phone: string;
  rol:string;
}

class UserService {
  async create({ name, lastname, username, password, email, phone, rol }: IUser) {
    if (!name || !lastname || !username || !password || !email || !phone || !rol) {
      throw new Error("Por favor complete todos los campos");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("El nombre de usuario ingresado ya existe");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("El email ingresado ya esta registrado");
    }

    const user = usersRepository.create({ name, lastname, username, password, email, phone, rol});

    console.log(user)

    await usersRepository.save(user);

    return user;

  }

  async delete(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();

    return user;
  }

  async getData(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    return user;
  }

  async getDataByUsername(username: string) {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.find(
      {where: {username:username}}
    );
    return user
  };

  async list() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor complete el campo de búsqueda");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("name like :search", { search: `%${search}%` })
      .orWhere("lastname like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("phone like :search", { search: `%${search}%` })
      .orWhere("rol like :search", { search: `%${search}%` })
      .getMany();

    return user;

  }

  async update({ id, name, lastname, username, password,email, phone, rol }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ name, lastname, username, password, email, phone, rol})
      .where("id = :id", { id })
      .execute();

    return user;

  }

}

export default UserService;