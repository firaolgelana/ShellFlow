/**
 * List of reserved usernames that cannot be claimed by users.
 * These correspond to existing routes and system paths.
 */
export const RESERVED_USERNAMES = [
    // Main routes
    'dashboard', 'tasks', 'calendar', 'categories',
    'profile', 'settings',

    // Auth routes
    'sign-in', 'sign-up', 'signin', 'signup', 'login', 'logout',

    // System routes
    'api', 'admin', 'app', 'support', 'help', 'about',
    'terms', 'privacy', 'contact', 'feedback',

    // Common reserved words
    'root', 'system', 'user', 'users', 'public', 'private',
];

/**
 * Validates username format and checks against reserved words.
 * @param username - The username to validate
 * @returns Object with isValid flag and optional error message
 */
export function validateUsername(username: string): {
    isValid: boolean;
    error?: string;
} {
    // Check if empty
    if (!username || username.trim().length === 0) {
        return { isValid: false, error: 'Username cannot be empty' };
    }

    // Convert to lowercase for validation
    const lowerUsername = username.toLowerCase();

    // Check length (3-30 characters)
    if (lowerUsername.length < 3) {
        return { isValid: false, error: 'Username must be at least 3 characters' };
    }
    if (lowerUsername.length > 30) {
        return { isValid: false, error: 'Username must be 30 characters or less' };
    }

    // Check format: alphanumeric, underscores, hyphens only
    const usernameRegex = /^[a-z0-9_-]+$/;
    if (!usernameRegex.test(lowerUsername)) {
        return {
            isValid: false,
            error: 'Username can only contain lowercase letters, numbers, underscores, and hyphens',
        };
    }

    // Check if starts/ends with special characters
    if (lowerUsername.startsWith('_') || lowerUsername.startsWith('-')) {
        return { isValid: false, error: 'Username cannot start with _ or -' };
    }
    if (lowerUsername.endsWith('_') || lowerUsername.endsWith('-')) {
        return { isValid: false, error: 'Username cannot end with _ or -' };
    }

    // Check against reserved words
    if (RESERVED_USERNAMES.includes(lowerUsername)) {
        return { isValid: false, error: 'This username is reserved and cannot be used' };
    }

    return { isValid: true };
}

/**
 * Normalizes a username to lowercase for storage.
 */
export function normalizeUsername(username: string): string {
    return username.toLowerCase().trim();
}
