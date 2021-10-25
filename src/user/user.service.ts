import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }



    async findByName(name: string): Promise<User> {
        return await this.userModel.findOne({ name }).exec()
    }

    async register(CreateUserDto: CreateUserDto): Promise<any> {
        const user = await this.findByName(CreateUserDto.name)
        if (user) return 'User already exists'
        const createdUser = new this.userModel(CreateUserDto)
        return await createdUser.save()
    }

    async login(CreateUserDto) {
        const { email, password } = CreateUserDto;
        const user = await this.userModel
            .findOne({ email })
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return user
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async finBbyId(id: String): Promise<User> {
        return await this.userModel.findOne({ _id: id }).exec()
    }
}