export interface User {
    id: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    emailVerified: boolean;
    username?: string; // Unique username for public profile access
    bio?: string; // User biography for profile
}
