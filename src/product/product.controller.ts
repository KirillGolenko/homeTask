import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/product.dto';
import { ProductService } from './product.service';
import Product from 'src/model/product.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/:id')
  findProduct(@Param('id') id: number): Promise<{ data: Product }> {
    return this.productService.findProduct(id);
  }

  @Post('/create')
  registration(@Body() body: CreateProductDto): Promise<{ data: Product[] }> {
    return this.productService.createProduct(body);
  }

  @Put('/:id/edit')
  editProduct(@Body() body: Product, @Param('id') id: number) {
    return this.productService.editProduct(body, id);
  }
}
