import {ApiProperty} from "@nestjs/swagger";
import {Category} from "@prisma/client";

export class CategoryEntity implements Category {
    constructor(partial: Partial<CategoryEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

