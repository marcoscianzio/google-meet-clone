import { PrismaClient } from "@prisma/client";
import { Application } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const withGoogle = async (app: Application, prisma: PrismaClient) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_KEY,
        callbackURL: "http://localhost:4000/oauth/google",
        scope: ["openid", "profile", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
        let user = await prisma.user.findUnique({
          where: {
            googleId: profile.id,
          },
        });

        console.log(profile);

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails![0].value,
              pic: profile.photos![0].value,
            },
          });
        }

        done(null, { user, refreshToken, accessToken });
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      session: false,
      scope: ["openid", "profile", "email"],
    })
  );

  app.get(
    "/oauth/google",
    passport.authenticate("google", { session: false }),
    (req: any, res: any) => {
      req.session.userId = req.user.user.id;

      res.redirect("http://localhost:3000/");
    }
  );
};
