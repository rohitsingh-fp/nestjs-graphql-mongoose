import { UserService } from './user.service';
import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { User } from './user.schema';
import { GetUserArgs } from './user.typeDef';
import { CreateUserInput } from './inputs/create-user.input';
import { LoginUserInput } from './inputs/login-user.input';
import { UserType } from './dto/create-user.dto';

@Resolver(() => UserType)
export class UserResolver {
  
  constructor(private readonly userService: UserService){}
  
  @Mutation(() => UserType)
  async registerUser(@Args('createUserData') input: CreateUserInput): Promise<UserType> {
      return this.userService.createUser(input);
  }

  
  @Mutation(() => UserType)
  async loginUser(@Args('loginUserData') input: LoginUserInput): Promise<UserType> {
      return this.userService.LoginUser(input);
  }


  @Query(() => UserType, {name: 'getUser', nullable: true})  
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<UserType>{
    let args;
    if(getUserArgs.hasOwnProperty('id')){
      args = {_id: getUserArgs.id}
    }else if(getUserArgs.hasOwnProperty('email')){
      args = {email: getUserArgs.email}
    }
    return this.userService.getUser(args);
  }
  
  @Query(() => [UserType], {name: 'getAllUser', nullable: true})  
  async getAllUser(): Promise<UserType[]>{
    return this.userService.getAllUser();
  }
  

}
