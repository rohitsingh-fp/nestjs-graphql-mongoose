import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLError, GraphQLFormattedError } from "graphql";

import { join } from "path";
import { AppResolver } from "./app.resolver";
import { JWT_ACCESS_TOKEN_SECRET } from "./config/tokens";
import { UserModule } from "./modules/user/user.module";

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
    UserModule,
  ],
  providers: [AppResolver]
})

export class AppModule {}
