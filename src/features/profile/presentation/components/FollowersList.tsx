import React from 'react';
import { UserProfile } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';

interface FollowersListProps {
    users: UserProfile[];
    onFollowClick?: (userId: string) => void;
    isFollowingMap?: Record<string, boolean>;
}

export const FollowersList: React.FC<FollowersListProps> = ({
    users,
    onFollowClick,
    isFollowingMap = {},
}) => {
    if (users.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">No followers yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar} alt={user.displayName || user.username} />
                            <AvatarFallback>
                                {(user.displayName || user.username || '?').charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            {user.username ? (
                                <Link href={`/${user.username}`}>
                                    <h3 className="font-semibold text-gray-900 hover:text-indigo-600">
                                        {user.displayName || user.username}
                                    </h3>
                                </Link>
                            ) : (
                                <h3 className="font-semibold text-gray-900">
                                    {user.displayName || 'Unknown User'}
                                </h3>
                            )}
                            {user.username && (
                                <p className="text-xs text-gray-500">@{user.username}</p>
                            )}
                            <p className="text-sm text-gray-600">{user.followers} followers</p>
                        </div>
                    </div>
                    <Button
                        variant={isFollowingMap[user.id] ? 'secondary' : 'default'}
                        size="sm"
                        onClick={() => onFollowClick?.(user.id)}
                    >
                        {isFollowingMap[user.id] ? 'Following' : 'Follow'}
                    </Button>
                </div>
            ))}
        </div>
    );
};
