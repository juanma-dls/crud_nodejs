import { request } from "express";
import { getCustomRepository } from "typeorm";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/OrderRepository";
import { ProductRepository } from "../repositories/ProductRepository";


interface IOrder {
  id?:number
  numOrder?: string,
  description: string,
  product_id: string,
  applicant_id: string
};

class OrderService {
  async create({  description, product_id, applicant_id }: IOrder) {
    if ( !description || !product_id || !applicant_id ) {
      throw new Error("Por favor complete todos los campos");
    };

    const orderRepository = getCustomRepository(OrderRepository);

    // const numOrderAlreadyExists = await orderRepository.findOne({ numOrder});

    // if (numOrderAlreadyExists) {
    //   throw new Error("El numero de pedido ya existe");
    // };

    const newOrder = new Order()
   
    // newOrder.numOrder = numOrder
    newOrder.description = description
    newOrder.product_id = product_id
    newOrder.applicant_id = applicant_id

    await orderRepository.save(newOrder);

    return newOrder;

  };

  async delete(id: string) {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where("id = :id", { id })
      .execute();

    return order;
  };

  async getData(id: string) {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.findOne(id);

    return order;
  };

  async list() {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.find({relations:["product", "applicant"]});   

    return order;
  };

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor complete el campo de búsqueda");
    };

    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository
      .createQueryBuilder()
      .where("numOrder like :search", { search: `%${search}%` })
      .orWhere("description like :search", { search: `%${search}%` })
      .orWhere("product_id like :search", { search: `%${search}%` })
      .orWhere("applicant_id like :search", { search: `%${search}%` })
      .getMany();

    return order;

  };

  async update({ id, numOrder, description, product_id, applicant_id }: IOrder) {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository
      .createQueryBuilder()
      .update(Order)
      .set({ description, product_id, applicant_id })
      .where("id = :id", { id })
      .execute();

    return order;

  };

}
export const orderRepository = new OrderService()
export default OrderService ;