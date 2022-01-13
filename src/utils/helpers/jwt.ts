import { Context } from 'apollo-server-core';
import * as jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET } from "src/config/tokens";

export const verifyToken = (context: Context) => {
      // let accessTokenSecret = JWT_ACCESS_TOKEN_SECRET;
      // const token = req.headers.authorization ? req.headers.authorization.split(" ")[1]:null;
      // jwt.verify(token, accessTokenSecret, (err, decoded) => {
      // return { user_id: decoded.id, user_role: decoded.role }
      // })
}