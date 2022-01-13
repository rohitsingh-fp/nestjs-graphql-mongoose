import { UserResponse } from "./response/user.response";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { CreateUserInput } from "./dto/input/create-user.input";
import { LoginUserInput } from "./dto/input/login-user.input";
import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
} from "src/config/tokens";
import { checkUserArgs } from "./dto/args/check-user.args";
import { generateRandomString } from "src/utils/common/generateRandomString";
import { generateFutureDate } from "src/utils/common/generateFutureDate";
import { authUserArgs } from "./dto/args/auth-user.args";
import { ConfirmUserInput } from "./dto/input/confirm-user.input";
import { CookieOptions } from "express";



const cookieOptions: CookieOptions = {
      domain: 'localhost', // <- Change to your client domain
      secure: false, // <- Should be true if !development
      sameSite: 'strict',
      httpOnly: true,
      path: '/',
    };

@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(registerInput: CreateUserInput) {
      if (registerInput.firstName?.length < 3) {
            throw new Error("firstName should be minimum 3 character long");
      }else if (registerInput.firstName?.length > 15) {
            throw new Error("firstName should be less then 15 character long");
      }else if (registerInput.lastName?.length < 3) {
            throw new Error("lastName should be minimum 3 character long");
      }else if (registerInput.lastName?.length > 15) {
            throw new Error("lastName should be less then 15 character long");
      }else if (registerInput.password?.length < 6) {
            throw new Error("password should be less then 6 character long");
      }else{
            let countUser = await this.checkUser({ email: registerInput.email });
            if(countUser > 0) {
                  throw new Error("Email already Exists");
            }else{
                  let confirmToken = await generateRandomString(16);
                  let ExpirationDate = await generateFutureDate(15);
                  await this.userModel.create({...registerInput, confirmToken, ExpirationDate});
                  return await this.userModel.findOne({ email: registerInput.email });
            }
      }
  }

  async LoginUser(loginInput: LoginUserInput) {
    let countUser = await this.checkUser({ email: loginInput.email });
    if (countUser === 0) {
      throw new Error("wrong email address provided");
    }
    let userData = await this.userModel.findOne({ email: loginInput.email });
    if(userData.active === false){
      return new Error("Please verify your email to login your account.");
    }
    let response = await bcrypt.compare(loginInput.password, userData.password);
    if (response) {
      let access_token = await this.generateAccessToken(userData);
      return {
        access_token: access_token
      };
    } else {
      return new Error("Password does not matched");
    }
  }
  async confirmUser(confirmInput: ConfirmUserInput){
      if(confirmInput.hasOwnProperty('confirmToken')){  
            let checkUser = await this.userModel.findOne({confirmToken: confirmInput?.confirmToken});
            if(checkUser){
                  let blankToken = await generateRandomString(16);
                  await this.userModel.findByIdAndUpdate({_id: checkUser._id},{active: true, confirmToken: blankToken});
                  return await this.userModel.findOne({_id: checkUser._id});
            }else{
                  return new Error("invalid Token provided")
            }
      }else{
            return new Error("please provide confirm token")
      }
  }
  async authUser(user){
      let userData = await this.userModel.findOne({email: user?.email});
      if(!userData){
        throw new Error("Not Authorized")
      }
      return userData;
  }

  async checkUser(checkUserArgs: checkUserArgs) {
    return await this.userModel.findOne(checkUserArgs).count();
  }

  async getAll(user){
    if(user !== undefined && user.email === 'rohit.singh@gmail.com'){
      return await this.userModel.find();
    }else{
      return {
        status: 401,
        message: "not Authorized"
      }
    }
  }
  async generateAccessToken(user: UserResponse): Promise<string> {
    const accessTokenSecret = JWT_ACCESS_TOKEN_SECRET;
    return jwt.sign(
      {
        id: user._id,
        email: user?.email,
        role: user.roleNo,
      },
      accessTokenSecret,
      { expiresIn: "1d" }
    );
  }

  async generateRefreshToken(user) {
    const refreshTokenSecret = JWT_REFRESH_TOKEN_SECRET;
    return jwt.sign(
      {
        id: user._id,
        role: user.roleNo,
      },
      refreshTokenSecret
    );
  }
}
