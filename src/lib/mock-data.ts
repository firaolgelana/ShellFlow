import { Category, DashboardStats, Task, User, WeeklyStats } from './types';

export const mockUser: User = {
    name: 'Alex Shell',
    email: 'alex@shellflow.com',
    avatarUrl: 'https://github.com/shadcn.png',
};

export const mockStats: DashboardStats = {
    totalToday: 12,
    completedToday: 8,
    pendingToday: 3,
    overdue: 1,
};

export const mockCategories: Category[] = [
    { id: '1', name: 'Work', color: 'bg-blue-500', count: 5 },
    { id: '2', name: 'Personal', color: 'bg-green-500', count: 3 },
    { id: '3', name: 'Learning', color: 'bg-purple-500', count: 2 },
    { id: '4', name: 'Health', color: 'bg-red-500', count: 2 },
];

export const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Review Q3 Financial Reports',
        category: 'Work',
        priority: 'High',
        status: 'Pending',
        dueDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Team Standup Meeting',
        category: 'Work',
        priority: 'Medium',
        status: 'Done',
        dueDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Grocery Shopping',
        category: 'Personal',
        priority: 'Low',
        status: 'Pending',
        dueDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
    {
        id: '4',
        title: 'React Query Deep Dive',
        category: 'Learning',
        priority: 'High',
        status: 'Pending',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        createdAt: new Date().toISOString(),
    },
    {
        id: '5',
        title: 'Gym Session',
        category: 'Health',
        priority: 'Medium',
        status: 'Done',
        dueDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
    {
        id: '6',
        title: 'Submit Project Proposal',
        category: 'Work',
        priority: 'High',
        status: 'Overdue',
        dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        createdAt: new Date().toISOString(),
    },
];

export const mockWeeklyStats: WeeklyStats[] = [
    { day: 'Mon', completed: 5, total: 8 },
    { day: 'Tue', completed: 7, total: 10 },
    { day: 'Wed', completed: 4, total: 6 },
    { day: 'Thu', completed: 8, total: 9 },
    { day: 'Fri', completed: 6, total: 8 },
    { day: 'Sat', completed: 3, total: 5 },
    { day: 'Sun', completed: 2, total: 4 },
];
