import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class checkUserArgs {
  @Field(() => String, {nullable: true})
  email: string;
}