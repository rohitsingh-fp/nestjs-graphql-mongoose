import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class ConfirmUserInput {
  @Field()
  @IsNotEmpty()
  confirmToken: string;

  
}