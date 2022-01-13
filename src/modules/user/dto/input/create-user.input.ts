
import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";


@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field({defaultValue: "free"})
  planType: string;

  @Field({nullable: true})
  confirmToken: string;

  @Field({nullable: true})
  ExpirationDate: string;

}
