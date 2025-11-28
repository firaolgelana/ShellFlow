'use client';

import React, { useState, useMemo } from 'react';
import { useProfile } from '@/features/profile/presentation/hooks/useProfile';
import { useFollowStats } from '@/features/social/presentation/hooks/useFollowStats';
import { useDailyTasks } from '@/features/profile/presentation/hooks/useDailyTasks';
import { useWeeklyTasks } from '@/features/profile/presentation/hooks/useWeeklyTasks';
import { useFollowers } from '@/features/profile/presentation/hooks/useFollowers';
import { useFollowing } from '@/features/profile/presentation/hooks/useFollowing';
import { useRouter } from 'next/navigation';
import { ProfileHeader } from '@/features/profile/presentation/components/ProfileHeader';
import { TabNavigation } from '@/features/profile/presentation/components/TabNavigation';
import { ProfileShellGrid } from '@/features/profile/presentation/components/ProfileShellGrid';
import { FollowersList } from '@/features/profile/presentation/components/FollowersList';
import { EditProfileDialog } from '@/features/profile/presentation/components/EditProfileDialog';
import { ProfileTab, UserProfile, ShellCard } from '@/features/profile/presentation/types';
import { Button } from '@/shared/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { User } from '@/features/auth/domain/User';
import { Task } from '@/features/shells/domain/Task';

export default function ProfilePage() {
    const { user, loading: profileLoading, error: profileError, refetch } = useProfile();
    const { stats: followStats } = useFollowStats(user?.id);
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<ProfileTab>('daily-shells');
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    // Fetch data for each tab
    const { tasks: dailyTasks, loading: dailyLoading } = useDailyTasks(user?.id);
    const { tasks: weeklyTasks, loading: weeklyLoading } = useWeeklyTasks(user?.id);
    const { followers, loading: followersLoading } = useFollowers(user?.id);
    const { following, loading: followingLoading } = useFollowing(user?.id);

    // Redirect to sign-in if not authenticated
    if (!profileLoading && !user) {
        router.push('/sign-in');
        return null;
    }

    // Map domain user to presentation user profile
    const userProfile: UserProfile | null = useMemo(() => {
        if (!user) return null;
        return {
            id: user.id,
            username: user.username, // Optional @username handle
            displayName: user.displayName || user.email.split('@')[0], // Fallback to email prefix
            email: user.email,
            avatar: user.photoURL || undefined,
            bio: user.bio || undefined,
            streakCount: 0, // TODO: Calculate from actual data
            followers: followStats.followerCount,
            following: followStats.followingCount,
            createdAt: new Date(), // TODO: Get from user document
        };
    }, [user, followStats]);

    // Helper function to map Task to ShellCard
    const mapTasksToShells = (tasks: Task[]): ShellCard[] => {
        if (!userProfile) return [];

        // Group tasks by date
        const tasksByDate = tasks.reduce((acc, task) => {
            const dateKey = task.date.toISOString().split('T')[0];
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(task);
            return acc;
        }, {} as Record<string, Task[]>);

        // Create a ShellCard for each date
        return Object.entries(tasksByDate).map(([dateKey, dateTasks]) => ({
            shell: {
                id: dateKey,
                userId: userProfile.id,
                title: `Tasks for ${new Date(dateKey).toLocaleDateString()}`,
                date: dateKey,
                tasks: dateTasks.map(task => ({
                    id: task.id,
                    title: task.title,
                    time: task.startTime,
                    duration: task.duration,
                    category: (task.category || 'work') as any,
                    icon: '📝',
                    status: task.status === 'completed' ? 'done' : task.status === 'pending' ? 'in-progress' : 'missed',
                    description: task.description,
                })),
                visibility: 'public' as const,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            user: userProfile,
            likes: 0,
            isLiked: false,
            comments: 0,
        }));
    };

    // Helper function to map User to UserProfile
    const mapUserToUserProfile = (users: User[]): UserProfile[] => {
        return users.map(u => ({
            id: u.id,
            username: u.username,
            displayName: u.displayName || u.email.split('@')[0],
            email: u.email,
            avatar: u.photoURL,
            bio: u.bio,
            streakCount: 0,
            followers: 0, // We don't have this data for other users yet
            following: 0,
            createdAt: new Date(),
        }));
    };

    const dailyShells = useMemo(() => mapTasksToShells(dailyTasks), [dailyTasks, userProfile]);
    const weeklyShells = useMemo(() => mapTasksToShells(weeklyTasks), [weeklyTasks, userProfile]);
    const followerProfiles = useMemo(() => mapUserToUserProfile(followers), [followers]);
    const followingProfiles = useMemo(() => mapUserToUserProfile(following), [following]);

    const handleFollowClick = (userId: string) => {
        setFollowingMap((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const handleEditProfile = () => {
        setIsEditDialogOpen(true);
    };

    const handleProfileUpdated = () => {
        // Refetch user data to show updated profile
        refetch();
    };

    // Show error state
    if (profileError) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-red-500 text-xl">{profileError}</div>
            </div>
        );
    }

    if (profileLoading || !userProfile) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* View Public Profile Button */}
            {user?.username && (
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/${user.username}`)}
                        className="gap-2"
                    >
                        <ExternalLink className="h-4 w-4" />
                        View Public Profile
                    </Button>
                </div>
            )}

            <ProfileHeader
                user={userProfile}
                isOwnProfile={true}
                onEditClick={handleEditProfile}
                onFollowClick={() => setIsFollowing(!isFollowing)}
                isFollowing={isFollowing}
            />

            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Content */}
            <div className="max-w-4xl mx-auto">
                {activeTab === 'daily-shells' && (
                    dailyLoading ? (
                        <div className="text-center py-12 text-gray-600">Loading daily tasks...</div>
                    ) : (
                        <ProfileShellGrid shells={dailyShells} />
                    )
                )}
                {activeTab === 'weekly-shells' && (
                    weeklyLoading ? (
                        <div className="text-center py-12 text-gray-600">Loading weekly tasks...</div>
                    ) : (
                        <ProfileShellGrid shells={weeklyShells} />
                    )
                )}
                {activeTab === 'followers' && (
                    followersLoading ? (
                        <div className="text-center py-12 text-gray-600">Loading followers...</div>
                    ) : (
                        <FollowersList users={followerProfiles} onFollowClick={handleFollowClick} isFollowingMap={followingMap} />
                    )
                )}
                {activeTab === 'following' && (
                    followingLoading ? (
                        <div className="text-center py-12 text-gray-600">Loading following...</div>
                    ) : (
                        <FollowersList users={followingProfiles} onFollowClick={handleFollowClick} isFollowingMap={followingMap} />
                    )
                )}
            </div>

            {/* Edit Profile Dialog */}
            {user && (
                <EditProfileDialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                    userId={user.id}
                    currentBio={user.bio}
                    currentDisplayName={user.displayName}
                    currentUsername={user.username}
                    onSuccess={handleProfileUpdated}
                />
            )}
        </div>
    );
}
