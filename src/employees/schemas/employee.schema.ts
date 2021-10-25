import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;
export type SessionDocument = Session & Document;

@Schema()
export class Session {
    @Prop()
    checkIn: Date;

    @Prop()
    checkOut: Date;

    @Prop()
    comment: string;

    @Prop()
    duration: number;

}

export const SessionSchema = SchemaFactory.createForClass(Session);


/** When timestamps is set to true, it will automatically generate updated at and created at */
@Schema({ timestamps: true })
export class Employee {

    @Prop()
    name: string;

    @Prop()
    firstName: string;

    @Prop()
    department: string;

    @Prop()
    currentSession: Session;

    @Prop()
    sessions: [Session];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
