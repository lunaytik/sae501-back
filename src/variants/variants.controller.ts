import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {VariantsService} from "./variants.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {VariantEntity} from "./entities/variant.entity";
import {CreateVariantDto} from "./dto/create-variant.dto";
import {Variant as VariantModel} from ".prisma/client";
import {UpdateVariantDto} from "./dto/update-variant.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from "path";
import * as fs from "fs";

@Controller('variants')
@ApiTags('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
      { name: 'materialFile', maxCount: 1 },
      { name: 'textureFile', maxCount: 1 },
    ],
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
  @ApiCreatedResponse({ type: VariantEntity })
  async create(
      @Body() createVariantDto: CreateVariantDto,
      @UploadedFiles() files: { materialFile?: Express.Multer.File[], textureFile?: Express.Multer.File[] }
  ): Promise<VariantModel> {
    if (files.materialFile) {
      createVariantDto.material = '/' + files.materialFile[0].destination.toString() + '/' + files.materialFile[0].filename.toString()
    }

    if (files.textureFile) {
      createVariantDto.textureImage = '/' + files.textureFile[0].destination.toString() + '/' + files.textureFile[0].filename.toString()
    }
    createVariantDto.productId = Number(createVariantDto.productId)

    return new VariantEntity(await this.variantsService.create(createVariantDto));
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: VariantEntity, isArray: true })
  async findAll(): Promise<VariantModel[]> {
    const variants = await this.variantsService.variants({});
    return variants.map((variant) => new VariantEntity(variant))
  }

  @Get('product/:id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: VariantEntity, isArray: true })
  async findAllByProduct(@Param('id', ParseIntPipe) id: number): Promise<VariantModel[]> {
    const variants = await this.variantsService.variants({ where: { productId: id } });
    return variants.map((variant) => new VariantEntity(variant))
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({ type: VariantEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VariantModel> {
    return new VariantEntity(await this.variantsService.variant({id: id}));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
            { name: 'materialFile', maxCount: 1 },
            { name: 'textureFile', maxCount: 1 },
          ],
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
  @ApiCreatedResponse({ type: VariantEntity })
  async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateVariantDto: UpdateVariantDto,
      @UploadedFiles() files: { materialFile?: Express.Multer.File[], textureFile?: Express.Multer.File[] }
  ) {
    const variant = new VariantEntity(await this.variantsService.variant({id: id}));

    if (files.materialFile) {
      updateVariantDto.material = '/' + files.materialFile[0].destination.toString() + '/' + files.materialFile[0].filename.toString()

      if (variant.material) {
        fs.unlink(variant.material, (err) => {
          if (err) {
            console.log(err);
            return err;
          }
        });
      }
    }

    if (files.textureFile) {
      updateVariantDto.textureImage = '/' + files.textureFile[0].destination.toString() + '/' + files.textureFile[0].filename.toString()

      if (variant.textureImage) {
        fs.unlink(variant.textureImage, (err) => {
          if (err) { console.log(err); return err; }
        });
      }
    }

    return new VariantEntity(await this.variantsService.update(id, updateVariantDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VariantEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const variant = new VariantEntity(await this.variantsService.remove({ id: id }));

    if (variant.material) {
      fs.unlink(variant.material, (err) => {
        if (err) {
          console.log(err);
          return err;
        }
      });
    }

    if (variant.textureImage) {
      fs.unlink(variant.textureImage, (err) => {
        if (err) {
          console.log(err);
          return err;
        }
      });
    }

    return variant;
  }
}