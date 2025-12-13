import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }

    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async findOneByLogin(login: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { login: login },
    });
    if (!user) {
      return null;
    }

    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { password: true },
    });
    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException();
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: {
          increment: 1,
        },
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const deletedUser = this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return deletedUser;
  }
}
