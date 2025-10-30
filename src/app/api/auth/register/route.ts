import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password)
            return NextResponse.json(
                { error: 'Missing fields' },
                { status: 400 }
            );

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser)
            return NextResponse.json(
                { error: 'User already exists.' },
                { status: 400 }
            );

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch {
        return NextResponse.json(
            { error: 'Something went wrong. Try again.' },
            { status: 500 }
        );
    }
}
