import { Session } from "../schemas/employee.schema";

export class CreateEmployeeDto {
    readonly name: string;
    readonly firstName: string;
    readonly department: string;
    readonly currentSession: Session;
    readonly sessions: Session[]
}
