import { FollowRepository } from '../domain/FollowRepository';

export interface FollowStats {
    followerCount: number;
    followingCount: number;
}

/**
 * Use case for getting follow statistics.
 */
export class GetFollowStatsUseCase {
    constructor(private followRepository: FollowRepository) { }

    async execute(userId: string): Promise<FollowStats> {
        if (!userId) {
            throw new Error('User ID is required');
        }

        const [followerCount, followingCount] = await Promise.all([
            this.followRepository.getFollowerCount(userId),
            this.followRepository.getFollowingCount(userId),
        ]);

        return {
            followerCount,
            followingCount,
        };
    }
}
