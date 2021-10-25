import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, BadRequestException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../user/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'name',
            passwordField: 'password'
        });
    }

    async validate(name: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(name, password);
        if (!user) {
            throw new BadRequestException({
                status: HttpStatus.BAD_REQUEST,
                error: "Wrong credentials",
            });
        }
        return user;
    }
}