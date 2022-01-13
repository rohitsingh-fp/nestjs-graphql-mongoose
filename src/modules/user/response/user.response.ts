import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserResponse {
  @Field(() => ID)
  _id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({nullable: true})
  roleNo: Number;

}
