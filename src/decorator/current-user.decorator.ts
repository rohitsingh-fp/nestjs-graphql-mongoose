import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from "jsonwebtoken"


export const CurrentUser = createParamDecorator(
  async (data: Object, context: ExecutionContext) => {
    let accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    let ctx, token;
    if(context.getType() === 'http'){
      let auth = context.switchToHttp().getRequest().headers.authorization
      if(!auth) {
        return {
          status: 401,
          message : "User is not authorized"
        }
      }
      token = auth.split(" ")[1];
      await jwt.verify(token, accessTokenSecret, (err, decoded) => {
        if(err) return new Error("User not authorized")
        data = decoded
      })
      return data;
    }else{
      ctx = GqlExecutionContext.create(context);
      token = ctx.getContext().req.headers.authorization.split(" ")[1]
      await jwt.verify(token, accessTokenSecret, (err, decoded) => {
        if(err) throw new Error("User not authorized")
        data = decoded
      })
      return data;
    }

    
  },
);