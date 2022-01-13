import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLError, GraphQLFormattedError } from "graphql";

import { join } from "path";
import { AppResolver } from "./app.resolver";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      debug: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
        };
        return graphQLFormattedError;
      },
    }),
    MongooseModule.forRoot("mongodb://localhost:27017/nest-db"),
    ConfigModule.forRoot(),
    UserModule,
  ],
  providers: [AppResolver]
})

export class AppModule {}
