import { Follow } from '../domain/Follow';
import { FollowRepository } from '../domain/FollowRepository';
import { db } from '@/features/auth/infrastructure/firebase/firebaseConfig';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    Timestamp,
    getCountFromServer
} from 'firebase/firestore';

/**
 * Firebase implementation of FollowRepository.
 */
export class FirebaseFollowRepository implements FollowRepository {
    private collectionName = 'follows';

    /**
     * Follow a user.
     */
    async followUser(followerId: string, followingId: string): Promise<void> {
        if (followerId === followingId) {
            throw new Error('Cannot follow yourself');
        }

        // Check if already following
        const isAlreadyFollowing = await this.isFollowing(followerId, followingId);
        if (isAlreadyFollowing) {
            return; // Already following, do nothing
        }

        const followsRef = collection(db, this.collectionName);
        await addDoc(followsRef, {
            followerId,
            followingId,
            createdAt: Timestamp.now(),
        });
    }

    /**
     * Unfollow a user.
     */
    async unfollowUser(followerId: string, followingId: string): Promise<void> {
        const followsRef = collection(db, this.collectionName);
        const q = query(
            followsRef,
            where('followerId', '==', followerId),
            where('followingId', '==', followingId)
        );
        const querySnapshot = await getDocs(q);

        // Delete all matching documents (should be only one)
        const deletePromises = querySnapshot.docs.map(docSnapshot =>
            deleteDoc(doc(db, this.collectionName, docSnapshot.id))
        );
        await Promise.all(deletePromises);
    }

    /**
     * Check if a user is following another user.
     */
    async isFollowing(followerId: string, followingId: string): Promise<boolean> {
        const followsRef = collection(db, this.collectionName);
        const q = query(
            followsRef,
            where('followerId', '==', followerId),
            where('followingId', '==', followingId)
        );
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    /**
     * Get list of user IDs that follow a specific user (followers).
     */
    async getFollowers(userId: string): Promise<string[]> {
        const followsRef = collection(db, this.collectionName);
        const q = query(followsRef, where('followingId', '==', userId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => doc.data().followerId);
    }

    /**
     * Get list of user IDs that a specific user is following.
     */
    async getFollowing(userId: string): Promise<string[]> {
        const followsRef = collection(db, this.collectionName);
        const q = query(followsRef, where('followerId', '==', userId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => doc.data().followingId);
    }

    /**
     * Get follower count for a user.
     */
    async getFollowerCount(userId: string): Promise<number> {
        const followsRef = collection(db, this.collectionName);
        const q = query(followsRef, where('followingId', '==', userId));
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count;
    }

    /**
     * Get following count for a user.
     */
    async getFollowingCount(userId: string): Promise<number> {
        const followsRef = collection(db, this.collectionName);
        const q = query(followsRef, where('followerId', '==', userId));
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count;
    }
}
