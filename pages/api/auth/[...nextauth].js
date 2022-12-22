import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
async function refreshAccessToken(tokenObject) {
  try {
    const response = await axios({
      url: `${process.env.baseURL}auth/refresh`,
      headers: {
        Authorization: tokenObject.refreshToken,
      },
    });
    if (response.status === 202) {
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    }
  } catch (error) {
    return {
      error: 'refreshToken Expired',
    };
  }
}
export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        try {
          const response = await axios({
            url: `${process.env.baseURL}auth/signin`,
            method: 'post',
            rejectUnauthorized: false,
            data: {
              email,
              password,
            },
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.status === 202) {
            const user = {
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
              email: email,
            };
            return user;
          } else if (response.status === 401) {
            throw new Error(response.data);
          }
        } catch (error) {
          return Promise.reject(new Error(error.response.data.message));
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
        return token;
      }
      const decoded = jwtDecode(token.accessToken);
      const refreshTime = decoded.iat + 60 * 30 * 1000 - Date.now();
      if (refreshTime > 0) {
        return Promise.resolve(token);
      }
      token = refreshAccessToken(token);
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.email = token.email;

      return session;
    },
  },
});
