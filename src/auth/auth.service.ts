import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(name: string, pass: string): Promise<any> {
        const user = await this.usersService.findByName(name);
        const compare = await bcrypt.compare(pass, user.password)
        if (user && compare) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { name: user.name, sub: user.userId };
        let foundUser: any = await this.usersService.findByName(user.name);
        return {
            access_token: this.jwtService.sign(payload),
            id: foundUser._id,
            name: foundUser.name
        };
    }
}
