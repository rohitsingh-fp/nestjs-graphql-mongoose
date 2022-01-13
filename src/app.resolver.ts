
import { Query, Resolver } from "@nestjs/graphql";

@Resolver(() => String)
export class AppResolver{
      @Query(() => String)
      test(): string {
        return  `Current ENV: ${process.env.ENV}`
      }
}