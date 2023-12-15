import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const authScope: string =
  "user-read-email user-read-private playlist-modify-public";

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId:
        process.env
          .SPOTIFY_CLIENT_ID! /* added ! so that ts doesn't complain, must be not undefined. */,
      clientSecret:
        process.env.SPOTIFY_CLIENT_SECRET ??
        "" /* or do this so it's empty if undefined*/,
      authorization: {
        params: { scope: authScope },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
