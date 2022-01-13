import { UserService } from 'src/modules/user/user.service';
import { Controller, Get } from "@nestjs/common";

import { User } from "./user.schema";
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Controller('user')
export class UserController{
      constructor(private readonly userService: UserService){}
      @Get('all')
      async getAllUser(@CurrentUser() user: any): Promise<User[]|{status: number, message: string}>{
            if(user.status === 401) return user;
            return this.userService.getAll(user);
      }
}