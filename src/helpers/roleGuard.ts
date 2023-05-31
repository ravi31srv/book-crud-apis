import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<any>(
      'allowedRoles',
      [context.getHandler(), context.getClass()],
    );
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    if (!requiredRoles) {
      return true;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
