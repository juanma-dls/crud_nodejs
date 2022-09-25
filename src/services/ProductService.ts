import { getCustomRepository } from "typeorm";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository"

interface IProduct {
  id?:number
  productname: string,
  price: number,
  type: string,
  categoryId: string
};

class ProductService {
  async create({ productname, price, type, categoryId }: IProduct) {
    if (!productname || !price || !type || !categoryId ) {
      throw new Error("Por favor complete todos los campos");
    };

    const productRepository = getCustomRepository(ProductRepository);

    const nameAlreadyExists = await productRepository.findOne({ productname});

    if (nameAlreadyExists) {
      throw new Error("El nombre del producto ingresado ya existe");
    };

    const newProduct = new Product()
   
    newProduct.productname = productname
    newProduct.price = price
    newProduct.type = type
    newProduct.categoryId = categoryId

    await productRepository.save(newProduct);

    return newProduct;

  };

  async delete(id: string) {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id })
      .execute();

    return product;
  };

  async getData(id: string) {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    return product;
  };

  async list() {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.find({relations:["category"]});   

    return product;
  };

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor complete el campo de búsqueda");
    };

    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository
      .createQueryBuilder()
      .where("productname like :search", { search: `%${search}%` })
      .orWhere("price like :search", { search: `%${search}%` })
      .orWhere("type like :search", { search: `%${search}%` })
      .orWhere("categoryId like :search", { search: `%${search}%` })
      .getMany();

    return product;

  };

  async update({ id, productname, price, type, categoryId }: IProduct) {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ productname, price, type, categoryId })
      .where("id = :id", { id })
      .execute();

    return product;

  };

}
export const productService = new ProductService()
export default ProductService ;