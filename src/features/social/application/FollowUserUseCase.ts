import { FollowRepository } from '../domain/FollowRepository';

/**
 * Use case for following a user.
 */
export class FollowUserUseCase {
    constructor(private followRepository: FollowRepository) { }

    async execute(followerId: string, followingId: string): Promise<void> {
        if (!followerId || !followingId) {
            throw new Error('Follower ID and Following ID are required');
        }

        if (followerId === followingId) {
            throw new Error('Cannot follow yourself');
        }

        await this.followRepository.followUser(followerId, followingId);
    }
}
