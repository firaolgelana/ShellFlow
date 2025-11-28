import { User } from '@/features/auth/domain/User';
import { UserRepository } from '@/features/profile/domain/UserRepository';
import { db } from '@/features/auth/infrastructure/firebase/firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

/**
 * Firebase implementation of UserRepository.
 * Handles user profile data access in Firestore.
 */
export class FirebaseUserRepository implements UserRepository {
    private readonly collectionName = 'users';

    /**
     * Get user by their ID.
     */
    async getUserById(userId: string): Promise<User | null> {
        try {
            const userDoc = await getDoc(doc(db, this.collectionName, userId));

            if (!userDoc.exists()) {
                return null;
            }

            const data = userDoc.data();
            return {
                id: userDoc.id,
                email: data.email,
                displayName: data.displayName || undefined,
                photoURL: data.photoURL || undefined,
                emailVerified: data.emailVerified || false,
                username: data.username || undefined,
                bio: data.bio || undefined,
            };
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Failed to fetch user by ID');
        }
    }

    /**
     * Get user by their unique username.
     */
    async getUserByUsername(username: string): Promise<User | null> {
        try {
            const usersRef = collection(db, this.collectionName);
            const q = query(usersRef, where('username', '==', username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return null;
            }

            // Username should be unique, so take first result
            const userDoc = querySnapshot.docs[0];
            const data = userDoc.data();

            return {
                id: userDoc.id,
                email: data.email,
                displayName: data.displayName || undefined,
                photoURL: data.photoURL || undefined,
                emailVerified: data.emailVerified || false,
                username: data.username || undefined,
                bio: data.bio || undefined,
            };
        } catch (error) {
            console.error('Error fetching user by username:', error);
            throw new Error('Failed to fetch user by username');
        }
    }

    /**
     * Check if a username is available (not taken by another user).
     */
    async isUsernameAvailable(username: string): Promise<boolean> {
        try {
            const user = await this.getUserByUsername(username);
            return user === null;
        } catch (error) {
            console.error('Error checking username availability:', error);
            throw new Error('Failed to check username availability');
        }
    }

    /**
     * Update a user's username in Firestore.
     * @throws Error if username is already taken
     */
    async updateUsername(userId: string, username: string): Promise<void> {
        try {
            // Check if username is available
            const isAvailable = await this.isUsernameAvailable(username);
            if (!isAvailable) {
                throw new Error('Username is already taken');
            }

            // Update the user document (creates if doesn't exist)
            const userRef = doc(db, this.collectionName, userId);
            await setDoc(userRef, {
                username: username,
                updatedAt: Timestamp.now(),
            }, { merge: true });
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            console.error('Error updating username:', error);
            throw new Error('Failed to update username');
        }
    }

    /**
     * Update user profile information (bio, displayName).
     */
    async updateProfile(userId: string, data: { bio?: string; displayName?: string }): Promise<void> {
        try {
            const userRef = doc(db, this.collectionName, userId);
            const updateData: Record<string, any> = {
                updatedAt: Timestamp.now(),
            };

            if (data.bio !== undefined) {
                updateData.bio = data.bio;
            }
            if (data.displayName !== undefined) {
                updateData.displayName = data.displayName;
            }

            await setDoc(userRef, updateData, { merge: true });
        } catch (error) {
            console.error('Error updating profile:', error);
            throw new Error('Failed to update profile');
        }
    }
}
