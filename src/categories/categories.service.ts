import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from "../prisma.service";
import { Category, Prisma } from "@prisma/client";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async category(
      categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: categoryWhereUniqueInput,
      include: {
        products: true
      }
    });
  }

  async categories(params: {
  }): Promise<Category[]> {
    return this.prisma.category.findMany({});
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data: createCategoryDto
    });
  }

  async update(
      id: number,
      updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
    return this.prisma.category.delete({
      where,
    });
  }
}
