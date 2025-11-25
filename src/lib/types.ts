export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Pending' | 'Done' | 'Overdue';

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: string;
    priority: Priority;
    status: Status;
    dueDate: string; // ISO date string
    createdAt: string;
}

export interface Category {
    id: string;
    name: string;
    color: string;
    count: number;
}

export interface WeeklyStats {
    day: string;
    completed: number;
    total: number;
}

export interface DashboardStats {
    totalToday: number;
    completedToday: number;
    pendingToday: number;
    overdue: number;
}

export interface User {
    name: string;
    email: string;
    avatarUrl?: string;
}
