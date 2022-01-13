import { Query, Resolver } from "@nestjs/graphql";

@Resolver(() => String)
export class AppResolver{
      @Query(() => String)
      test(): string {
        return 'Hello World!';
      }
}