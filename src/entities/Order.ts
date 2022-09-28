import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Applicant } from "./Applicant";
import { Product } from "./Product";
import shortid from 'shortid'

@Entity('orders')
class Order {

  @PrimaryColumn()
  id: string;
  
  @Column({
    type: String,
    default: shortid.generate()
  })
  numOrder: string

  @Column({
    length: 200,
  })
  description: string;

  @Column()
  product_id: string

  @Column()
  applicant_id: string

  
  @ManyToOne(() => Product, product => product.orders)
  @JoinColumn({ name: 'product_id'})
  product: Product;
  
  @ManyToOne(() => Applicant, applicant => applicant.orders)
  @JoinColumn({ name: 'applicant_id'})
  applicant: Applicant;
  
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

export { Order }