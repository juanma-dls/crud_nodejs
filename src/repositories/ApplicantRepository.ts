import { Repository, EntityRepository } from "typeorm";
import { Applicant } from "../entities/Applicant";

@EntityRepository(Applicant)
class ApplicantRepository extends Repository<Applicant>{ }

export { ApplicantRepository };