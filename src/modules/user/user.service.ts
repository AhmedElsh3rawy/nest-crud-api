import { Injectable } from '@nestjs/common';
import pool from 'src/utils/db.config';
import {
  GetUsers,
  GetUserById,
  CheckEmailExists,
  AddUser,
} from './user.quries';
import { res, ok } from 'src/utils/response.helper';
import httpStatus from 'src/utils/http.status.codes';
@Injectable()
export class UserService {
  async create(user: any) {
    const u = await pool.query(CheckEmailExists, [user.email]);
    if (u.rows.length) {
      return res('User already exsit', httpStatus.BadRequest);
    }
    try {
      await pool.query(AddUser, [
        user.first_name,
        user.last_name,
        user.email,
        user.dob,
      ]);
      return ok('User added', user, true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await pool.query(GetUsers);
      if (!result) {
        return res('No users', httpStatus.NotFound);
      }
      const rows = result.rows;
      return ok('All users', rows, false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const result = await pool.query(GetUserById, [id]);
      if (!result.rows.length) {
        return res('User not found', httpStatus.NotFound);
      }
      const rows = result.rows;
      return ok('Found user', rows, false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
