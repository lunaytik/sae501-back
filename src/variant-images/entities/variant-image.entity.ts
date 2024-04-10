import {VariantImage} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";
import {VariantEntity} from "../../variants/entities/variant.entity";

export class VariantImageEntity implements VariantImage {
    @ApiProperty()
    id: number;

    @ApiProperty({ required: false, nullable: true })
    image: string | null;

    @Exclude()
    variantId: number;

    @ApiProperty({ required: false, type: VariantEntity })
    variant?: VariantEntity;

    constructor({ variant,...data}: Partial<VariantImageEntity>) {
        Object.assign(this, data);

        if (variant) {
            this.variant = new VariantEntity(variant);
        }
    }
}
