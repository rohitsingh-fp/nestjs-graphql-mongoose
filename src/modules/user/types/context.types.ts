import { Request, Response } from 'express';
import { User } from '../user.schema';


type Ctx = {
  req: Request & { user?: Pick<User, '_id' | 'roleName'> };
  res: Response;
};

export default Ctx;
