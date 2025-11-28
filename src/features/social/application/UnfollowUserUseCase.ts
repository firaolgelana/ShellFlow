import { FollowRepository } from '../domain/FollowRepository';

/**
 * Use case for unfollowing a user.
 */
export class UnfollowUserUseCase {
    constructor(private followRepository: FollowRepository) { }

    async execute(followerId: string, followingId: string): Promise<void> {
        if (!followerId || !followingId) {
            throw new Error('Follower ID and Following ID are required');
        }

        await this.followRepository.unfollowUser(followerId, followingId);
    }
}
