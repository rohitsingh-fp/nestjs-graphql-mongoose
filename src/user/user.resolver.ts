import { UserService } from './user.service';
import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { User } from './user.schema';
import { CreateUserInput, GetUserArgs, LoginUserInput } from './user.typeDef';

@Resolver(() => User)
export class UserResolver {
  
  constructor(private readonly userService: UserService){}
  
  @Mutation(() => User)
  async registerUser(@Args('createUserData') input: CreateUserInput): Promise<User> {
      return this.userService.createUser(input);
  }

  
  @Mutation(() => User)
  async loginUser(@Args('loginUserData') input: LoginUserInput): Promise<User> {
      return this.userService.LoginUser(input);
  }


  @Query(() => User, {name: 'getUser', nullable: true})  
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User>{
    let args;
    if(getUserArgs.hasOwnProperty('id')){
      args = {_id: getUserArgs.id}
    }else if(getUserArgs.hasOwnProperty('email')){
      args = {email: getUserArgs.email}
    }
    return this.userService.getUser(args);
  }
  
  @Query(() => [User], {name: 'getAllUser', nullable: true})  
  async getAllUser(): Promise<User[]>{
    return this.userService.getAllUser();
  }
  

}
