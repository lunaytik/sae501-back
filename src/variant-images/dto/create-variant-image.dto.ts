import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

export class CreateVariantImageDto {
    @Exclude()
    image?: string;

    @ApiProperty()
    variantId: number;

    @ApiProperty({type: 'string', format: 'binary'})
    file?: Express.Multer.File;
}
