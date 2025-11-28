import { User } from '@/features/auth/domain/User';
import { FollowRepository } from '../domain/FollowRepository';
import { UserRepository } from '@/features/profile/domain/UserRepository';

/**
 * Use case for getting users that the current user is following, with their full details.
 */
export class GetFollowingWithDetailsUseCase {
    constructor(
        private followRepository: FollowRepository,
        private userRepository: UserRepository
    ) { }

    async execute(userId: string): Promise<User[]> {
        if (!userId) {
            throw new Error('User ID is required');
        }

        // Get following IDs
        const followingIds = await this.followRepository.getFollowing(userId);

        // Fetch user details for each user being followed
        const followingPromises = followingIds.map(id =>
            this.userRepository.getUserById(id)
        );
        const following = await Promise.all(followingPromises);

        // Filter out any null results (in case a user was deleted)
        return following.filter((user): user is User => user !== null);
    }
}
