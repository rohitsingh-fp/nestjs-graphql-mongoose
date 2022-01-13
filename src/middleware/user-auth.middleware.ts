import { Injectable, NestMiddleware } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import { JWT_ACCESS_TOKEN_SECRET } from "src/config/tokens";

@Injectable()
export class UserAuthMiddleware implements NestMiddleware{
      use(context: GqlExecutionContext, next: NextFunction){
            let accessTokenSecret = JWT_ACCESS_TOKEN_SECRET;
            const token = context.getContext().req.headers.authorization.split(" ")[1];
            jwt.verify(token, accessTokenSecret, (err, decoded) => {
                  if(err) throw new Error("User not authorized")
                  console.log("middleware ",decoded);
                  return {decoded};
                })
            next();   
      }
}