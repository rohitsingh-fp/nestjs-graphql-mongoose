import { ArgsType, Field } from '@nestjs/graphql';

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