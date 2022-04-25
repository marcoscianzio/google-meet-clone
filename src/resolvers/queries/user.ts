import { User } from "../../models/user";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../../context";

@Resolver()
export class UserQueries {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, prisma }: Context): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        googleId: req.session.userId,
      },
    });

    return user;
  }
}
