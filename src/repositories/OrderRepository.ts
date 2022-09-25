import { Repository, EntityRepository } from "typeorm";
import { Order } from "../entities/Order";

@EntityRepository(Order)
class OrderRepository extends Repository<Order>{ }

export { OrderRepository };