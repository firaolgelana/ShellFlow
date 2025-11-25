'use client';

import { Sidebar } from '@/features/dashboard/sidebar';
import { Navbar } from '@/features/dashboard/navbar';

export default function ShellLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar - Hidden on mobile, visible on medium screens and up */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
                <Navbar />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto max-w-7xl space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
