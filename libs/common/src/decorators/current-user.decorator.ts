import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from 'apps/auth/src/users/models/user.model';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  const request = context.switchToHttp().getRequest();
  console.log('user === ', request.user);
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
