import { Module } from '@nestjs/common';
import { VariantImagesService } from './variant-images.service';
import { VariantImagesController } from './variant-images.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [VariantImagesController],
  providers: [VariantImagesService, PrismaService],
})
export class VariantImagesModule {}
