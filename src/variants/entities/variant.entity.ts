import {Variant} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {ProductEntity} from "../../products/entities/product.entity";
import {Exclude} from "class-transformer";

export class VariantEntity implements Variant {
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

    @ApiProperty({ required: false, type: ProductEntity })
    product?: ProductEntity;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor({ product,...data}: Partial<VariantEntity>) {
        Object.assign(this, data);

        if (product) {
            this.product = new ProductEntity(product);
        }
    }
}
