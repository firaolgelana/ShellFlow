/**
 * Domain entity representing a Task.
 * Pure TypeScript, no dependencies.
 */
export interface Task {
    id: string;
    title: string;
    description: string;
    date: Date;
    userId: string;
    createdAt: Date;
}
