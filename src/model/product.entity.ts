import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public quantity: number;
}

export default Product;
