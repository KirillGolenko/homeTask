import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  quantity: number;
}
