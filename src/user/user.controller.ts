import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SafeUserEntity } from './entities/safe-user.entity';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: SafeUserEntity,
  })
  @ApiBadRequestResponse({
    description:
      'Bad Request. body does not contain required fields or fields are invalid.',
  })
  create(@Body() createUserDto: CreateUserDto): SafeUserEntity {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Returns all users',
    type: SafeUserEntity,
    isArray: true,
  })
  findAll(): SafeUserEntity[] {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'Returns single user', type: SafeUserEntity })
  @ApiBadRequestResponse({ description: 'Bad Request. ID is invalid UUID.' })
  @ApiNotFoundResponse({ description: 'User with ID not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string): SafeUserEntity {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiOkResponse({
    description: 'User password updated successfully',
    type: SafeUserEntity,
  })
  @ApiBadRequestResponse({
    description:
      'Bad Request. Invalid ID, old password mismatch, or new password invalid.',
  })
  @ApiNotFoundResponse({ description: 'User with ID not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): SafeUserEntity {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @ApiNoContentResponse({
    description: 'User deleted successfully (No Content returned)',
  })
  @ApiBadRequestResponse({ description: 'Bad Request. ID is invalid UUID.' })
  @ApiNotFoundResponse({ description: 'User with ID not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.userService.remove(id);
  }
}
