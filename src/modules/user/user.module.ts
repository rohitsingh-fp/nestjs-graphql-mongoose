import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from "./user.service";
import { UserController } from './user.controller';

@Module({
      imports: [
            MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers:[UserController],
      providers: [UserResolver, UserService]
})
export class UserModule {}
