import { getCustomRepository } from "typeorm";
import { Applicant } from "../entities/Applicant";
import { ApplicantRepository } from "../repositories/ApplicantRepository";


interface IApplicant {
  id?:number
  name:string,
  lastname:string,
  dni: string;
  province: string;
  city: string;

}

class ApplicantService {
  async create({ name, lastname, dni, province, city }: IApplicant) {
    if (!name || !lastname || !dni || !province || !city ) {
      throw new Error("Por favor complete todos los campos");
    }

    const applicantRepository = getCustomRepository(ApplicantRepository);

    const dniAlreadyExists = await applicantRepository.findOne({ dni });

    if (dniAlreadyExists) {
      throw new Error("El dni del usuario ingresado ya existe");
    }

    const applicant = applicantRepository.create({ name, lastname, dni, province, city });

    await applicantRepository.save(applicant);

    return applicant;
  }

  async delete(id: string) {
    const applicantRepository = getCustomRepository(ApplicantRepository);

    const applicant = await applicantRepository
      .createQueryBuilder()
      .delete()
      .from(Applicant)
      .where("id = :id", { id })
      .execute();

    return applicant;
  }

  async getData(id: string) {
    const applicantRepository = getCustomRepository(ApplicantRepository);

    const applicant = await applicantRepository.findOne(id);

    return applicant;
  }

  async list() {
    const applicantRepository = getCustomRepository(ApplicantRepository);

    const applicants = await applicantRepository.find();

    return applicants;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor complete el campo de búsqueda");
    }

    const applicantRepository = getCustomRepository(ApplicantRepository);

    const applicant = await applicantRepository
      .createQueryBuilder()
      .where("dni like :search", { search: `%${search}%` })
      .orWhere("name like :search", { search: `%${search}%` })
      .orWhere("lastname like :search", { search: `%${search}%` })
      .orWhere("province like :search", { search: `%${search}%` })
      .orWhere("city like :search", { search: `%${search}%` })
      .getMany();

    return applicant;

  }

  async update({ id, name, lastname, dni, province, city }: IApplicant) {
    const applicantRepository = getCustomRepository(ApplicantRepository);

    const applicant = await applicantRepository
      .createQueryBuilder()
      .update(Applicant)
      .set({ 
        name, 
        lastname, 
        dni, 
        province, 
        city
        })
      .where("id = :id", { id })
      .execute();

    return applicant;

  }

}
export const applicantService = new ApplicantService()
export default ApplicantService;