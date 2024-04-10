import { Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import {PrismaService} from "../prisma.service";
import {Variant, Prisma} from "@prisma/client";

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}

  async variant(
      variantWhereUniqueInput: Prisma.VariantWhereUniqueInput,
  ): Promise<Variant | null> {
    return this.prisma.variant.findUnique({
      where: variantWhereUniqueInput,
      include: {
        product: true,
        images: true
      },
    });
  }

  async variants(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VariantWhereUniqueInput;
    where?: Prisma.VariantWhereInput;
    orderBy?: Prisma.VariantOrderByWithRelationInput;
  }): Promise<Variant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.variant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        product: true,
      }
    });
  }

  async create(createVariantDto: CreateVariantDto): Promise<Variant> {
    return this.prisma.variant.create({
      data: createVariantDto,
      include: {
        product: true,
      },
    });
  }

  async update(
      id: number,
      updateVariantDto: UpdateVariantDto
  ): Promise<Variant> {
    return this.prisma.variant.update({
      where: { id },
      data: updateVariantDto,
      include: {
        product: true,
      },
    });
  }

  async remove(where: Prisma.VariantWhereUniqueInput): Promise<Variant> {
    return this.prisma.variant.delete({
      where,
    });
  }
}