/**
 * Domain entity representing a Follow relationship.
 */
export interface Follow {
    id: string;
    followerId: string; // User who is following
    followingId: string; // User being followed
    createdAt: Date;
}
