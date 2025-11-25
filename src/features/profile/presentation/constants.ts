// Application constants

export const CATEGORIES = {
    work: { label: 'Work', color: '#6366F1' },
    health: { label: 'Health', color: '#EC4899' },
    learning: { label: 'Learning', color: '#F59E0B' },
    personal: { label: 'Personal', color: '#10B981' },
    fitness: { label: 'Fitness', color: '#06B6D4' },
} as const;

export const TASK_ICONS = [
    'briefcase',
    'heart',
    'book',
    'zap',
    'dumbbell',
    'code',
    'coffee',
    'users',
    'target',
    'star',
];

export const STREAK_MILESTONE = {
    BRONZE: 7,
    SILVER: 30,
    GOLD: 100,
    PLATINUM: 365,
};
