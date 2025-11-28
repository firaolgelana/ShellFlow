// Core type definitions for Daily Shell (Presentation Layer)

export type ProfileTab = 'daily-shells' | 'weekly-shells' | 'followers' | 'following';

export type TaskStatus = 'done' | 'in-progress' | 'missed';
export type ShellVisibility = 'public' | 'friends' | 'private';
export type Category = 'work' | 'health' | 'learning' | 'personal' | 'fitness';

export interface Task {
    id: string;
    title: string;
    time: string; // HH:MM format
    duration: number; // minutes
    category: Category;
    icon: string;
    status: TaskStatus;
    description?: string;
}

export interface Shell {
    id: string;
    userId: string;
    title: string;
    date: string; // YYYY-MM-DD
    tasks: Task[];
    visibility: ShellVisibility;
    createdAt: Date;
    updatedAt: Date;
    isWeekly?: boolean;
    weeklySchedule?: string[]; // ['Mon', 'Tue', etc]
}

export interface UserProfile {
    id: string;
    username?: string; // @username handle for public profile URL
    displayName: string; // Display name shown in UI
    email: string;
    avatar?: string;
    bio?: string;
    streakCount: number;
    followers: number;
    following: number;
    createdAt: Date;
}

export interface Follow {
    id: string;
    followerId: string;
    followingId: string;
    createdAt: Date;
}

export interface ShellCard {
    shell: Shell;
    user: UserProfile;
    likes: number;
    isLiked: boolean;
    comments: number;
}
