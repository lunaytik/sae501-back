import {Role, User} from "@prisma/client";
import {Exclude} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: Role;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @Exclude()
    password: string;
}