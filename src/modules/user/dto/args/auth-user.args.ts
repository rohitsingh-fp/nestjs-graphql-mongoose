import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class authUserArgs {
  @Field(() => String)
  email: string;
  
}