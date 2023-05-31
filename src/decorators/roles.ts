import { SetMetadata } from '@nestjs/common';

import { useRoles } from 'src/auth/userModel';

export const Roles = (...roles: [useRoles]) =>
    SetMetadata('allowedRoles', roles);
