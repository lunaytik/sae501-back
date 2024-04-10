import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

export class CreateVariantDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Exclude()
    material?: string;

    @Exclude()
    textureImage?: string;

    @ApiProperty()
    productId: number;

    @ApiProperty({type: 'string', format: 'binary'})
    materialFile?: Express.Multer.File;

    @ApiProperty({type: 'string', format: 'binary'})
    textureFile?: Express.Multer.File;
}
