import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const user = await this.userService.findOneByLogin(signUpDto.login);
    if (user) {
      throw new ConflictException();
    }

    const hashedPass = await this.hashPassword(signUpDto.password);
    return await this.userService.create({
      ...signUpDto,
      password: hashedPass,
    });
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { login, password } = loginDto;
    const user = await this.userService.findOneByLogin(login);
    if (!user) {
      throw new ForbiddenException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ForbiddenException();
    }

    return this.generateTokens(user.id, user.login);
  }

  async refresh(
    refreshToken?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw new UnauthorizedException('refreshToken is expired or not valid');
    }

    const refreshSecret = this.configService.get<string>(
      'JWT_SECRET_REFRESH_KEY',
    );

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: refreshSecret,
      });
    } catch (e) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }

    const user = await this.userService.findOneById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateTokens(user.id, user.login);
  }

  private async generateTokens(
    id: string,
    login: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { userId: id, login };
    const expiresInValue = this.configService.get<ms.StringValue>(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: ms(expiresInValue) ?? '24h',
    });

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRoundsString =
      this.configService.get<string>('CRYPT_SALT') ?? '10';
    const saltRounds = parseInt(saltRoundsString, 10);

    if (isNaN(saltRounds)) {
      throw new Error('CRYPT_SALT must be a number in the .env file');
    }

    return bcrypt.hash(password, saltRounds);
  }
}
