import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {PrismaService} from "../prisma.service";
import {AuthEntity} from "./auth.entity";
import {compare} from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async login(email: string, password: string): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return {
            accessToken: this.jwtService.sign({ userId: user.id }),
        };
    }
}
