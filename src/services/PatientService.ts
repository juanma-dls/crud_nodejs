import { getCustomRepository } from "typeorm";
import { Patient } from "../entities/Patient";
import { PatientRepository } from "../repositories/PatientRepository";

interface IPatient {
  id?:number
  name:string,
  lastname:string,
  dni:number,
  sexo:string,
  obraSocial: string
};

class PatientService {
  async create({ name, lastname, dni, sexo, obraSocial }: IPatient) {
    if (!name || !lastname || !dni || !sexo || !obraSocial) {
      throw new Error("Por favor complete todos los campos");
    };

    const patientRepository = getCustomRepository(PatientRepository);

    const dniAlreadyExists = await patientRepository.findOne({ dni});

    if (dniAlreadyExists) {
      throw new Error("El nombre del producto ingresado ya existe");
    };

    const patient = patientRepository.create({ name, lastname, dni, sexo, obraSocial })

    await patientRepository.save(patient);

    return patient;

  };

  async delete(id: string) {
    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository
      .createQueryBuilder()
      .delete()
      .from(Patient)
      .where("id = :id", { id })
      .execute();

    return patient;
  };

  async getData(id: string) {
    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository.findOne(id);

    return patient;
  };

  async list() {
    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository.find();   

    return patient;
  };

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor complete el campo de búsqueda");
    };

    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository
      .createQueryBuilder()
      .where("name like :search", { search: `%${search}%` })
      .orWhere("lastname like :search", { search: `%${search}%` })
      .orWhere("dni like :search", { search: `%${search}%` })
      .orWhere("sexo like :search", { search: `%${search}%` })
      .orWhere("obraSocial like :search", { search: `%${search}%` })
      .getMany();

    return patient;

  };

  async update({ id, name, lastname, dni, sexo, obraSocial }: IPatient) {
    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository
      .createQueryBuilder()
      .update(Patient)
      .set({ name, lastname, dni, sexo, obraSocial })
      .where("id = :id", { id })
      .execute();

    return patient;

  };

}
export const patientService = new PatientService()
export default PatientService ;