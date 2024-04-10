import { PartialType } from '@nestjs/swagger';
import { CreateVariantImageDto } from './create-variant-image.dto';

export class UpdateVariantImageDto extends PartialType(CreateVariantImageDto) {}
