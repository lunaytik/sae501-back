import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {PrismaService} from "../prisma.service";
import {Product, Prisma} from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async product(
      productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
      include: {
        category: true,
        variants: true
      },
    });
  }

  async products(params: {
  }): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        category: true,
      }
    });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
      include: {
        category: true,
      },
    });
  }

  async update(
      id: number,
      updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        category: true,
      },
    });
  }

  async remove(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }
}
