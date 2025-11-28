import { UserRepository } from '../domain/UserRepository';

/**
 * Use case for updating user profile information.
 */
export class UpdateProfileUseCase {
    constructor(private userRepository: UserRepository) { }

    /**
     * Execute the update profile use case.
     * @param userId - The ID of the user to update
     * @param data - Profile data to update (bio, displayName)
     */
    async execute(userId: string, data: { bio?: string; displayName?: string }): Promise<void> {
        // Validate input
        if (!userId) {
            throw new Error('User ID is required');
        }

        // Validate bio length if provided
        if (data.bio !== undefined && data.bio.length > 500) {
            throw new Error('Bio must be 500 characters or less');
        }

        // Validate display name length if provided
        if (data.displayName !== undefined && data.displayName.length > 100) {
            throw new Error('Display name must be 100 characters or less');
        }

        // Update profile via repository
        await this.userRepository.updateProfile(userId, data);
    }
}
