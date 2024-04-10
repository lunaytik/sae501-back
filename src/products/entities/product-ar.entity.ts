import {Product} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {CategoryEntity} from "../../categories/entities/category.entity";
import {Exclude} from "class-transformer";
import {VariantEntity} from "../../variants/entities/variant.entity";
import {VariantArEntity} from "../../variants/entities/variant-ar.entity";

export class ProductArEntity implements Product {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false, nullable: true })
    description: string | null;

    @ApiProperty({ required: false, nullable: true })
    image: string | null;

    @Exclude()
    categoryId: number | null;

    @ApiProperty({ required: false, type: CategoryEntity })
    category?: CategoryEntity;

    @ApiProperty({ required: false, type: VariantArEntity, isArray: true })
    variants?: VariantArEntity[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor({ category, variants,...data}: Partial<ProductArEntity>) {
        Object.assign(this, data);

        if (category) {
            this.category = new CategoryEntity(category);
        }

        if (variants) {
            this.variants = variants.map((variant) => { return new VariantArEntity(variant) });
        }
    }
}
