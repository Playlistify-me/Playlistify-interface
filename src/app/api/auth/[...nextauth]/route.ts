import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId:
        process.env
          .SPOTIFY_CLIENT_ID! /* added ! so that ts doesn't complain, must be not undefined. */,
      clientSecret:
        process.env.SPOTIFY_CLIENT_SECRET ??
        "" /* or do this so it's empty if undefined*/,
      /*
      custom scope example: 
      const scopeHere: string = "user-read-email user-read-private";
      authorization: {
        params: {scopeHere}",
      },
      */
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        console.log("PROFILE HERE");
        console.log(profile);
        console.log("USER HERE");
        console.log(user);
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, for now access token and profile pic. Using to test.
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      console.log("SESSION HERE");
      console.log(session);

      return session;
    },
  },
  // change pages: https://next-auth.js.org/configuration/pages
});

export { handler as GET, handler as POST };
