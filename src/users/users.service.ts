import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from "@prisma/client";
import {hashSync} from "bcrypt";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async users(params: {
        // skip?: number;
        // take?: number;
        // cursor?: Prisma.UserWhereUniqueInput;
        // where?: Prisma.UserWhereInput;
        // orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        // const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            // skip,
            // take,
            // cursor,
            // where,
            // orderBy,
        });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = hashSync(createUserDto.password, 12);

        return this.prisma.user.create({
            data: createUserDto
        });
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto
    ): Promise<User> {
        updateUserDto.password = hashSync(updateUserDto.password, 12);

        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
