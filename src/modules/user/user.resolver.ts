import { LoginResponse } from './response/login.response';
import { UserService } from './user.service';
import { Resolver, Mutation, Args, Query, GqlExecutionContext } from "@nestjs/graphql";
import { CreateUserInput } from './dto/input/create-user.input';
import { LoginUserInput } from './dto/input/login-user.input';
import { UserResponse } from './response/user.response';
import { AuthUserResponse } from './response/auth-user.response';
import { authUserArgs } from './dto/args/auth-user.args';
import { ConfirmUserInput } from './dto/input/confirm-user.input';
import { CurrentUser } from 'src/decorator/current-user.decorator';




@Resolver()
export class UserResolver {
  
  constructor(private readonly userService: UserService){}
  
  @Mutation(() => UserResponse)
  async registerUser(@Args('registerInput') registerInput: CreateUserInput): Promise<UserResponse|Error> {
    return this.userService.createUser(registerInput);
  }
  
  @Mutation(() => UserResponse)
  async confirmUser(@Args('confirmInput') confirmInput: ConfirmUserInput): Promise<UserResponse|Error> {
    return this.userService.confirmUser(confirmInput);
  }

  @Mutation(() => LoginResponse)
  async loginUser(@Args('loginInput') loginInput: LoginUserInput): Promise<LoginResponse|Error> {
      return this.userService.LoginUser(loginInput);
  }

  @Query(() => AuthUserResponse)
  async authUser(@CurrentUser() user: any): Promise<AuthUserResponse|Error|undefined> {
    return this.userService.authUser(user);
  }

}
