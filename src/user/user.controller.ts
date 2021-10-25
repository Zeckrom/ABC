import { Controller, Post, Body, Get, Req, Put, Delete, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const createdUser = await this.usersService.register(createUserDto);
        return createdUser;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async find(@Req() req: Request) {
        return await this.usersService.finBbyId(req.params.id).catch((err) => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: err,
            }, 400)
        })
    }
}