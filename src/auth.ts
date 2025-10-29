import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) return null;
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user) return null;

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                );

                if (!passwordMatch) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
});
