import { getCustomRepository } from "typeorm";
import { Medic } from "../entities/Medic";
import { MedicRepository } from "../repositories/MedicRepository";

interface IMedic {
  id?:number
  name:string,
  lastname:string,
  specialty:string,
  tuition:string
};

class MedicService {
  async create({ name, lastname, specialty, tuition }: IMedic) {
    if (!name || !lastname || !specialty || !tuition  ) {
      throw new Error("Por favor complete todos los campos");
    }

    const medicRepository = getCustomRepository(MedicRepository);

    const tuitionAlreadyExists = await medicRepository.findOne({ tuition });

    if (tuitionAlreadyExists) {
      throw new Error("La matrícula de médico ingresado ya existe");
    }

    const medic = medicRepository.create({ name, lastname, specialty, tuition });

    await medicRepository.save(medic);

    return medic;
  }

  async delete(id: string) {
    const medicRepository = getCustomRepository(MedicRepository);

    const medic = await medicRepository
      .createQueryBuilder()
      .delete()
      .from(Medic)
      .where("id = :id", { id })
      .execute();

    return medic;
  }

  async getData(id: string) {
    const medicRepository = getCustomRepository(MedicRepository);

    const medic = await medicRepository.findOne(id);

    return medic;
  }

  async list() {
    const medicRepository = getCustomRepository(MedicRepository);

    const medics = await medicRepository.find();

    return medics;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor complete el campo de búsqueda");
    }

    const medicRepository = getCustomRepository(MedicRepository);

    const medic = await medicRepository
      .createQueryBuilder()
      .where("name like :search", { search: `%${search}%` })
      .orWhere("lastname like :search", { search: `%${search}%` })
      .orWhere("specialty like :search", { search: `%${search}%` })
      .orWhere("tuition like :search", { search: `%${search}%` })
      .getMany();

    return medic;

  }

  async update({ id, name, lastname, specialty, tuition }: IMedic) {
    const medicRepository = getCustomRepository(MedicRepository);

    const medic = await medicRepository
      .createQueryBuilder()
      .update(Medic)
      .set({ 
        name, 
        lastname, 
        specialty, 
        tuition,
        })
      .where("id = :id", { id })
      .execute();

    return medic;

  }
}

export default MedicService;