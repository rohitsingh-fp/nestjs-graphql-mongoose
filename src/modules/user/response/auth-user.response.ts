import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Date } from "mongoose";

@ObjectType()
export class AuthUserResponse {
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
      
      @Field({nullable: true})
      roleName: string;

      
      @Field({nullable: true})
      planType: string;

      
      @Field(() => Date, {nullable: true})
      ExpirationDate: Date;
}
