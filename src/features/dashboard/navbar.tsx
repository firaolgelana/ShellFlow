'use client';

import { Bell, Search, User as UserIcon } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { useAuth } from '@/features/auth/presentation/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Navbar() {
    const { user, signOut } = useAuth();
    const router = useRouter();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex w-full max-w-sm items-center gap-2">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search tasks..."
                        className="w-full bg-background pl-9 md:w-[300px] lg:w-[300px]"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                    <span className="sr-only">Notifications</span>
                </Button>
                {showNotifications && (
                    <div className="absolute right-6 top-16 w-64 rounded-md border bg-background shadow-lg p-4">
                        <p className="text-sm text-muted-foreground">No new notifications.</p>
                    </div>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || 'User'} />
                                <AvatarFallback>{user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.displayName || 'User'}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
