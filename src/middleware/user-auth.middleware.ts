import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UserAuthMiddleware implements NestMiddleware{
      use(req: Request, res: Response, next: NextFunction){
            const token = req.headers.authorization?req.headers.authorization.split(" ")[1]:null;
            console.log("token", token);
            next();   
      }
}