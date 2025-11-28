'use client';

import { User } from '@/features/auth/domain/User';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { useFollow } from '../hooks/useFollow';
import { useAuth } from '@/features/auth/presentation/useAuth';
import Link from 'next/link';

interface UserCardProps {
    user: User;
}

export function UserCard({ user }: UserCardProps) {
    const { user: currentUser } = useAuth();
    const { isFollowing, loading, toggleFollow } = useFollow(currentUser?.id, user.id);

    const isCurrentUser = currentUser?.id === user.id;

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <Link href={`/${user.username || user.id}`} className="flex items-center gap-3 flex-1">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                            <AvatarFallback>
                                {(user.displayName || user.email || 'U')[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold">{user.displayName || 'Anonymous'}</p>
                            {user.username && (
                                <p className="text-sm text-muted-foreground">@{user.username}</p>
                            )}
                            {user.bio && (
                                <p className="text-sm text-muted-foreground line-clamp-1">{user.bio}</p>
                            )}
                        </div>
                    </Link>
                    {!isCurrentUser && (
                        <Button
                            variant={isFollowing ? 'outline' : 'default'}
                            size="sm"
                            onClick={toggleFollow}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
