import React from 'react';
import { UserProfile } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Share2, Edit2, Flame } from 'lucide-react';

interface ProfileHeaderProps {
    user: UserProfile;
    isOwnProfile?: boolean;
    onEditClick?: () => void;
    onFollowClick?: () => void;
    isFollowing?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    user,
    isOwnProfile = false,
    onEditClick,
    onFollowClick,
    isFollowing = false,
}) => {
    return (
        <div className="bg-white border-b border-gray-200">
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400"></div>

            {/* Profile Content */}
            <div className="px-4 py-6">
                <div className="flex items-start gap-4 mb-6">
                    {/* Avatar */}
                    <div className="relative -mt-20">
                        <Avatar className="w-32 h-32 border-4 border-white">
                            <AvatarImage src={user.avatar} alt={user.username} />
                            <AvatarFallback className="text-4xl">
                                {user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Actions */}
                    <div className="flex-1 flex justify-end gap-2 pt-4">
                        {isOwnProfile ? (
                            <>
                                <Button variant="outline" size="default" onClick={onEditClick}>
                                    <Edit2 size={18} className="mr-2" />
                                    Edit Profile
                                </Button>
                                <Button variant="secondary" size="default">
                                    <Share2 size={18} />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant={isFollowing ? 'secondary' : 'default'}
                                    size="default"
                                    onClick={onFollowClick}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                                <Button variant="outline" size="default">
                                    <Share2 size={18} />
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* User Info */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                    <p className="text-gray-600 text-sm mt-1">@{user.username.toLowerCase()}</p>
                    {user.bio && <p className="text-gray-700 mt-3">{user.bio}</p>}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">{user.streakCount}</p>
                        <p className="text-xs text-gray-600 flex items-center justify-center gap-1 mt-1">
                            <Flame size={14} className="text-orange-500" />
                            Day Streak
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">{user.followers}</p>
                        <p className="text-xs text-gray-600 mt-1">Followers</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">{user.following}</p>
                        <p className="text-xs text-gray-600 mt-1">Following</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">24</p>
                        <p className="text-xs text-gray-600 mt-1">Shells</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
