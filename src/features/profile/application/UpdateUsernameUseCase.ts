import { UserRepository } from '@/features/profile/domain/UserRepository';
import { validateUsername, normalizeUsername } from '@/features/profile/utils/usernameValidation';

/**
 * Use case for updating a user's username.
 * Handles validation and uniqueness checking.
 */
export class UpdateUsernameUseCase {
    constructor(private userRepository: UserRepository) { }

    /**
     * Execute the use case to update  username.
     * @param userId - The ID of the user updating their username
     * @param newUsername - The desired new username
     * @throws Error if validation fails or username is taken
     */
    async execute(userId: string, newUsername: string): Promise<void> {
        if (!userId || userId.trim().length === 0) {
            throw new Error('User ID is required');
        }

        // Validate username format
        const validation = validateUsername(newUsername);
        if (!validation.isValid) {
            throw new Error(validation.error || 'Invalid username');
        }

        // Normalize username
        const normalizedUsername = normalizeUsername(newUsername);

        // Check if username is available
        const isAvailable = await this.userRepository.isUsernameAvailable(normalizedUsername);
        if (!isAvailable) {
            // Double-check: might be the user's current username
            const existingUser = await this.userRepository.getUserByUsername(normalizedUsername);
            if (existingUser && existingUser.id !== userId) {
                throw new Error('Username is already taken');
            }
            // If it's the same user, allow the "update" (idempotent)
            if (existingUser && existingUser.id === userId) {
                return; // No-op, already has this username
            }
        }

        // Update the username
        await this.userRepository.updateUsername(userId, normalizedUsername);
    }
}
