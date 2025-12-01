import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InMemoryDatabaseService } from '../in-memory-database/in-memory-database.service';
import { User } from './entities/user.entity';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(private readonly db: InMemoryDatabaseService) {}

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const user = this.db.createUser(createUserDto);

    return omit(user, ['password']);
  }

  findAll(): Array<Omit<User, 'password'>> {
    const users = this.db.getAllUsers();
    const safeUsers = users.map((user) => {
      return omit(user, ['password']);
    });

    return safeUsers;
  }

  findOne(id: string): Omit<User, 'password'> {
    const user = this.db.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return omit(user, ['password']);
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    const user = this.db.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException();
    }
    const updatedUser = this.db.updateUser(id, updatePasswordDto);

    return omit(updatedUser, ['password']);
  }

  remove(id: string): Omit<User, 'password'> {
    const user = this.db.getUserById(id);
    if (!user) {
      throw new NotFoundException();
    }

    const deletedUser = this.db.deleteUser(id);

    return omit(deletedUser, ['password']);
  }
}
