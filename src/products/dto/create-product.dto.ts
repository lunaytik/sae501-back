import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({type: 'string', format: 'binary'})
    file?: Express.Multer.File;

    @Exclude()
    image?: string;

    @ApiProperty()
    categoryId: number;
}
