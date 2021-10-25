import { Body, Controller, Get, Post, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Req() req: Request): Promise<Cat> {
    return this.catsService.delete(req.params.id);
  }
}
