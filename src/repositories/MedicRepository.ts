import { Repository, EntityRepository } from "typeorm";
import { Medic } from "../entities/Medic";

@EntityRepository(Medic)
class MedicRepository extends Repository<Medic>{ }

export { MedicRepository };