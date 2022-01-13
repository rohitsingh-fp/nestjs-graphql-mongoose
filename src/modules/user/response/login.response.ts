import { ObjectType, Field } from "@nestjs/graphql";
import { UserResponse } from "./user.response";

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field()
  User: UserResponse;
}
