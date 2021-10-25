import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto'

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  const createEmployeeDto: CreateEmployeeDto = {
    name: "first",
    firstName: "first",
    department: "science",
    currentSession: {},
    sessions: [],
  }

  const mockEmployee: any = {
    name: "first",
    firstName: "first",
    department: "science",
    currentSession: {},
    sessions: [],
    _id: "dfrzerz"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: "employee 1",
                firstName: "employee 1",
                department: "science",
                currentSession: {},
                sessions: [],
              },
              {
                name: "employee 2",
                firstName: "employee 2",
                department: "science",
                currentSession: {},
                sessions: [],
              },
              {
                name: "employee 3",
                firstName: "employee 3",
                department: "science",
                currentSession: {},
                sessions: [],
              },
            ]),
            create: jest.fn().mockResolvedValue(createEmployeeDto),
          }
        }
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService)



  });

  describe('create()', () => {
    it('should create a new cat', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockEmployee);

      await controller.create(createEmployeeDto);
      expect(createSpy).toHaveBeenCalledWith(createEmployeeDto);
    });
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  // describe('findAll', () => {
  //   it('should return an array of employees', async () => {
  //     const result = [];
  //     jest.spyOn(service, 'findAll').mockImplementation(async () => result);

  //     expect(await service.findAll('2021-10-25')).toBe(result);
  //   });
  // });
});
