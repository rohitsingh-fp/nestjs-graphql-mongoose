import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { type } from "os";

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id: string;

  @Field()
  fullName: string;

  @Field()
  mobile: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmToken: string;

  @Field(() => Int)
  confirmOtp: number;

  @Field()
  active: boolean;
}
