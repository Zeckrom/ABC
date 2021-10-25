import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CheckInDto } from './dto/checkIn.dto';
import { CheckOutDto } from './dto/checkOut.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/role.enum";

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  // @UseGuards(AuthGuard('jwt'))
  // @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const created = await this.employeesService.create(createEmployeeDto);
    return created
  }

  @Get('/:date?')
  async findAll(@Param('date') date: string) {
    return await this.employeesService.findAll(date);
  }

  @Post('/check-in/:id')
  async checkIn(@Param('id') id: string, @Body() checkInDto: CheckInDto) {
    return await this.employeesService.checkIn(id, checkInDto);
  }

  @Post('/check-out/:id')
  async checkOut(@Param('id') id: string, @Body() checkOutDto: CheckOutDto) {
    return await this.employeesService.checkOut(id, checkOutDto);
  }

}
