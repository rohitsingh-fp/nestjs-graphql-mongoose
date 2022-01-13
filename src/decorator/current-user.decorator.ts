import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from "jsonwebtoken"
import { JWT_ACCESS_TOKEN_SECRET } from 'src/config/tokens';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    let accessTokenSecret = JWT_ACCESS_TOKEN_SECRET;
    let token = ctx.getContext().req.headers.authorization.split(" ")[1]
    await jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if(err) throw new Error("User not authorized")
      console.log(decoded);
      return {decoded};
    })
  },
);