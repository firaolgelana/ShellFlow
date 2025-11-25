import { useState, useEffect } from 'react';
import { User } from '@/features/auth/domain/User';
import { GetUserProfileUseCase } from '@/features/profile/application/GetUserProfileUseCase';
import { FirebaseAuthRepository } from '@/features/auth/infrastructure/FirebaseAuthRepository';

/**
 * Hook to fetch and manage the user profile.
 * @returns The user profile, loading state, and error state.
 */
export const useProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const authRepo = new FirebaseAuthRepository();
                const getUserProfileUseCase = new GetUserProfileUseCase(authRepo);
                const currentUser = await getUserProfileUseCase.execute();
                setUser(currentUser);
            } catch (err) {
                setError('Failed to load profile');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { user, loading, error };
};
