import { AuthRepository } from '@/features/auth/domain/AuthRepository';
import { User } from '@/features/auth/domain/User';

/**
 * Use case for retrieving the current user's profile.
 */
export class GetUserProfileUseCase {
    constructor(private authRepository: AuthRepository) { }

    /**
     * Executes the use case.
     * @returns The current user or null if not authenticated.
     */
    async execute(): Promise<User | null> {
        return this.authRepository.getCurrentUser();
    }
}
