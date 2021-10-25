import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
// import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

// @ApiUseTags('Auth')
@Controller('api')
export class AppController {

    constructor(private readonly authService: AuthService) { }

    //   @ApiOperation({title: 'Logs in'})
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.body)
    }


}
