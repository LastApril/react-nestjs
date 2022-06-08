import { Request } from 'express';
import { User } from '../users/schema/user.schema';

export interface RequestCustom extends Request {
  user: User;
}
