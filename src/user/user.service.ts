import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import { checkUserArgs, CreateUserInput, GetUserArgs, LoginUserInput } from "./user.typeDef";
import * as jwt from "jsonwebtoken"

@Injectable()
export class UserService {
      constructor( @InjectModel(User.name) private userModel: Model<UserDocument>) {}

      async createUser(input: CreateUserInput){
            let countUser = await this.checkUser({email: input.email})
            if(countUser > 0){
                  throw new Error("Email already Exists");
            }
            return await this.userModel.create(input);
      }

      async LoginUser(input: LoginUserInput){
            let countUser = await this.checkUser({email: input.email})
            if(countUser === 0){
                  throw new Error("wrong email address provided");
            }
            return await this.userModel.findOne({email: input.email});      
      }

      async getUser(getUserArgs: GetUserArgs){
            return await this.userModel.findOne(getUserArgs);
      }
      
      async getAllUser(){
            return await this.userModel.find();
      }

      
      async checkUser(checkUserArgs: checkUserArgs){
            return  await this.userModel.findOne(checkUserArgs).count();         
      }

      

}