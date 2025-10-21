import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        // Placeholder auth: accept any non-empty email and password
        return { id: '1', email: credentials.email, name: '测试用户' } as any;
      }
    }),
    ...(process.env.EMAIL_SERVER && process.env.EMAIL_FROM
      ? [
          EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
          })
        ]
      : [])
  ],
  session: {
    strategy: 'jwt'
  }
};
