import {Product} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {CategoryEntity} from "../../categories/entities/category.entity";
import {Exclude} from "class-transformer";

export class ProductEntity implements Product {
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

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor({ category,...data}: Partial<ProductEntity>) {
        Object.assign(this, data);

        if (category) {
            this.category = new CategoryEntity(category);
        }
    }
}
