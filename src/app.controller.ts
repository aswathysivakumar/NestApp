import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { PermissionsGuard } from 'src/guards/permissions/permissions.guard';

@UseGuards(AuthGuard, PermissionsGuard)
@Roles(Role.Admin)
@ApiBearerAuth()
@ApiTags('Dashboard')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('dashboard')
  getAdminDashboard() {
    return 'This is the admin dashboard';
  }
}
