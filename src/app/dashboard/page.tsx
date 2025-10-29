'use client';
import { useSession, signOut } from 'next-auth/react';

export default function DashboardPage() {
    const { data: session, status } = useSession();

    const handleLogout = async () => {
        await signOut({ redirectTo: '/login' });
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'unauthenticated') {
        return <div>Please Login</div>;
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-4">
                Welcome, {session?.user?.name || session?.user?.email}! You are
                logged in.
            </p>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
}
