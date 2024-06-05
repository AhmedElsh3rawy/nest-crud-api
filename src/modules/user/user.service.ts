import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import pool from 'src/utils/db.config';
import { GetUsers, GetUserById } from './user.quries';
import { async } from 'rxjs';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    try {
      const result = await pool.query(GetUsers);
      const rows = result.rows;
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const result = await pool.query(GetUserById, [id]);
      const rows = result.rows;
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
