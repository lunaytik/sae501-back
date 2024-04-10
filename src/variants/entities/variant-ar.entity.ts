import {Variant} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {ProductEntity} from "../../products/entities/product.entity";
import {Exclude} from "class-transformer";

export class VariantArEntity implements Variant {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false, nullable: true })
    material: string | null;

    @ApiProperty({ required: false, nullable: true })
    textureImage: string | null;

    @Exclude()
    productId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false, nullable: true })
    nameJsonModel: string | null;

    constructor({ ...data }: Partial<VariantArEntity>) {
        Object.assign(this, data);

        this.nameJsonModel = this.name.toLowerCase().replace(' ', '_');
    }
}
