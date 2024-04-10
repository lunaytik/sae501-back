import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CategoryEntity} from "./entities/category.entity";
import {Category as CategoryModel} from '@prisma/client';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CategoryEntity })
  async create(
      @Body() createCategoryDto: CreateCategoryDto
  ): Promise<CategoryModel> {
    return new CategoryEntity(await this.categoriesService.create(createCategoryDto));
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  async findAll(): Promise<CategoryModel[]> {
    const categories = await this.categoriesService.categories({});
    return categories.map((category) => new CategoryEntity(category))
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({ type: CategoryEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoryModel> {
    return new CategoryEntity(await this.categoriesService.category({id: id}));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CategoryEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return new CategoryEntity(await this.categoriesService.update(id, updateCategoryDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CategoryEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new CategoryEntity(await this.categoriesService.remove({ id: id }));
  }
}
