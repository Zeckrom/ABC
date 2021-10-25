import { HttpException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Model } from 'mongoose'
import { Employee, EmployeeDocument, Session, SessionDocument } from './schemas/employee.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CheckInDto } from './dto/checkIn.dto';
import { CheckOutDto } from './dto/checkOut.dto';
import { endOfDay, startOfDay } from 'date-fns'

@Injectable()
export class EmployeesService {

  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>,
    @InjectModel(Session.name) private readonly sessionModel: Model<SessionDocument>
  ) { }

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const createdEmployee = new this.employeeModel(createEmployeeDto);
    return createdEmployee.save();
  }

  findAll(date: string) {
    if (date) {
      return this.employeeModel.find({
        createdAt: {
          $gte: startOfDay(new Date(date)),
          $lte: endOfDay(new Date(date))
        }
      }).exec();
    } else {
      return this.employeeModel.find().exec();
    }

  }

  async checkIn(id: string, checkInDto: CheckInDto): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);
    if (employee.currentSession) {
      // If the employee hasn't checked out, checking in again is not allowed
      if (employee.currentSession.checkIn) {
        throw new HttpException('Please checkout before checking in again.', 400);
      }
    }
    employee.currentSession = new this.sessionModel();
    employee.currentSession.checkIn = new Date();
    if (checkInDto.comment) {
      employee.currentSession.comment = checkInDto.comment;
    }
    return employee.save()
  }

  async checkOut(id: string, checkOutDto: CheckOutDto): Promise<Employee> {
    const employee = await this.employeeModel.findById(id);
    if (!employee.currentSession?.checkIn) {
      throw new HttpException('Please check in before checking out.', 400);
    }
    const checkOutDate = new Date();
    const duration = checkOutDate.getTime() - new Date(employee.currentSession.checkIn).getTime()

    const session = new this.sessionModel({ checkIn: employee.currentSession.checkIn, checkOut: checkOutDate, comment: checkOutDto.comment, duration })
    employee.sessions.push(session)
    employee.currentSession = new this.sessionModel()
    return employee.save()

  }

}
