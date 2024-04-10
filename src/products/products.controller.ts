import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ProductsService} from "./products.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ProductEntity} from "./entities/product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {Product as ProductModel} from ".prisma/client";
import {UpdateProductDto} from "./dto/update-product.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from "path";
import * as fs from "fs";
import {ProductArEntity} from "./entities/product-ar.entity";

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/uploads',
      filename: (req, file, cb) => {
        cb(null, path.parse(file.originalname).name + Date.now() + path.parse(file.originalname).ext);
      },
    }),
  }))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: ProductEntity })
  async create(
      @Body() createProductDto: CreateProductDto,
      @UploadedFile() file?: Express.Multer.File
  ): Promise<ProductModel> {
    if (file) {
      createProductDto.image = '/' + file.destination.toString() + '/' + file.filename.toString()
    }

    createProductDto.categoryId = Number(createProductDto.categoryId)
    return new ProductEntity(await this.productsService.create(createProductDto));
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll(): Promise<ProductModel[]> {
    const products = await this.productsService.products({});
    return products.map((product) => new ProductEntity(product))
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductModel> {
    return new ProductEntity(await this.productsService.product({id: id}));
  }

  @Get(':id/ar')
  async findOneForAr(@Param('id', ParseIntPipe) id: number): Promise<ProductModel> {
    return new ProductArEntity(await this.productsService.product({id: id}));
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file',
      {
        storage: diskStorage({
          destination: 'public/uploads',
          filename: (req, file, cb) => {
            cb(null, path.parse(file.originalname).name + Date.now() + path.parse(file.originalname).ext);
          },
        }),
      })
  )
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: ProductEntity })
  async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateProductDto: UpdateProductDto,
      @UploadedFile() file: Express.Multer.File
  ): Promise<ProductModel> {
    if (file) {
      const product = new ProductEntity(await this.productsService.product({id: id}))
      updateProductDto.image = '/' + file.destination.toString() + '/' + file.filename.toString();

      if (product.image) {
        fs.unlink(product.image, (err) => {
          if (err) {
            console.log(err);
            return err;
          }
        });
      }
    }

    return new ProductEntity(await this.productsService.update(id, updateProductDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    // remove product image
    return new ProductEntity(await this.productsService.remove({ id: id }));
  }
}