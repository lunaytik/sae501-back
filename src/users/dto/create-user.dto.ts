import {IsEmail, IsNotEmpty, IsStrongPassword} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}