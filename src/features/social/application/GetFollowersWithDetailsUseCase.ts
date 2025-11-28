import { User } from '@/features/auth/domain/User';
import { FollowRepository } from '../domain/FollowRepository';
import { UserRepository } from '@/features/profile/domain/UserRepository';

/**
 * Use case for getting followers with their full user details.
 */
export class GetFollowersWithDetailsUseCase {
    constructor(
        private followRepository: FollowRepository,
        private userRepository: UserRepository
    ) { }

    async execute(userId: string): Promise<User[]> {
        if (!userId) {
            throw new Error('User ID is required');
        }

        // Get follower IDs
        const followerIds = await this.followRepository.getFollowers(userId);

        // Fetch user details for each follower
        const followerPromises = followerIds.map(id =>
            this.userRepository.getUserById(id)
        );
        const followers = await Promise.all(followerPromises);

        // Filter out any null results (in case a user was deleted)
        return followers.filter((user): user is User => user !== null);
    }
}
