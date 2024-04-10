import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./users.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async create(
      @Body() createUserDto: CreateUserDto,
  ): Promise<UserModel> {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(): Promise<UserModel[]> {
    const users = await this.usersService.users({});
    return users.map((user) => new UserEntity(user))
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return new UserEntity(await this.usersService.user({ id: id }));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserModel> {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return new UserEntity(await this.usersService.remove({ id: id }));
  }
}
