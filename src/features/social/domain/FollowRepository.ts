import { Follow } from './Follow';

/**
 * Repository interface for Follow operations.
 */
export interface FollowRepository {
    /**
     * Follow a user.
     */
    followUser(followerId: string, followingId: string): Promise<void>;

    /**
     * Unfollow a user.
     */
    unfollowUser(followerId: string, followingId: string): Promise<void>;

    /**
     * Check if a user is following another user.
     */
    isFollowing(followerId: string, followingId: string): Promise<boolean>;

    /**
     * Get list of users that follow a specific user (followers).
     */
    getFollowers(userId: string): Promise<string[]>;

    /**
     * Get list of users that a specific user is following.
     */
    getFollowing(userId: string): Promise<string[]>;

    /**
     * Get follower count for a user.
     */
    getFollowerCount(userId: string): Promise<number>;

    /**
     * Get following count for a user.
     */
    getFollowingCount(userId: string): Promise<number>;
}
