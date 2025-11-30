import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get the greeting message' })
  @ApiResponse({
    status: 200,
    description: 'Get the greeting message',
    type: String,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
