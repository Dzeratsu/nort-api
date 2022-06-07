import {
  HttpCode,
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { userDto } from './dto/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async regUser(userDto: userDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    const lastId = await this.userModel.find().limit(1).sort({ id: -1 });
    const findUserName = await this.userModel.find({ name: userDto.user });
    console.log(findUserName);
    if (findUserName[0] !== undefined) {
      throw new ConflictException('Пользователь с таким именем уже существует');
    }
    if (lastId[0] == undefined) {
      newUser.id = 1;
    } else {
      newUser.id = +lastId[0].id + 1;
    }
    newUser.password = await bcrypt.hash(userDto.password, 10);
    return newUser.save();
  }

  async AuthUser(payload): Promise<any> {
    const user = await this.userModel.findOne({ user: payload.login });
    if (user) {
      const checkPassword = await bcrypt.compare(
        payload.password,
        user.password,
      );
      if (user && checkPassword) {
        return user;
      } else {
        throw new UnauthorizedException('Не правильный пароль');
      }
    } else {
      throw new UnauthorizedException('Такого пользователя не существует');
    }
  }

  async userData(req) {
    const info = await this.userModel.findOne(
      { login: req.user.login },
      { id: 1, user: 1, email: 1, name: 1, _id: 0 },
    );
    if (info) {
      return info;
    } else {
      throw new ForbiddenException();
    }
  }

  async allManager() {
    const manager = await this.userModel.find(
      { role: 0 },
      { FIO: 1, login: 1, _id: 0 },
    );
    return manager;
  }
}
