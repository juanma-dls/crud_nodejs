import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { Order } from "./Order";

@Entity("products")
class Product {

  @PrimaryColumn()
  id: string;

  @Column()
  productname: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column()
  categoryId: string

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId'})
  category: Category;

  @OneToMany(() => Order, order => order.product)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Product };