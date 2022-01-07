import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  fullName: string;

  @Field()
  @IsNotEmpty()
  mobile: string;

  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}


@InputType()
export class ConfirmUserInput {
  @Field()
  confirmToken: string;

  @Field()
  confirmOtp: number;
}


@ArgsType()
export class GetUserArgs {

  @Field(() => String, {nullable: true})
  id: string;
  
  @Field(() => String, {nullable: true})
  email: string;

}

@ArgsType()
export class checkUserArgs {
  @Field(() => String)
  email: string;
}