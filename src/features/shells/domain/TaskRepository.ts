import { Task } from './Task';

/**
 * Interface for Task Repository.
 * Defines methods for accessing and modifying tasks.
 * Implementation will be in the Infrastructure layer.
 */
export interface TaskRepository {
    /**
     * Retrieves all tasks for a specific user.
     * @param userId The ID of the user.
     * @returns A promise that resolves to an array of Tasks.
     */
    getTasks(userId: string): Promise<Task[]>;

    /**
     * Retrieves recent tasks for a specific user.
     * @param userId The ID of the user.
     * @param limitCount Maximum number of tasks to retrieve.
     * @returns A promise that resolves to an array of Tasks.
     */
    getRecentTasks(userId: string, limitCount?: number): Promise<Task[]>;

    /**
     * Creates a new task.
     * @param task The task to create.
     * @returns A promise that resolves when the task is created.
     */
    createTask(task: Task): Promise<void>;

    /**
     * Updates the status of a specific task.
     * @param taskId The ID of the task to update.
     * @param status The new status for the task.
     * @returns A promise that resolves when the task status is updated.
     */
    updateTaskStatus(taskId: string, status: Task['status']): Promise<void>;

    /**
     * Retrieves tasks for a specific user on a specific date.
     * @param userId The ID of the user.
     * @param date The date to filter tasks by.
     * @returns A promise that resolves to an array of Tasks for that date.
     */
    getTasksByDate(userId: string, date: Date): Promise<Task[]>;

    /**
     * Retrieves tasks for a specific user within a date range.
     * @param userId The ID of the user.
     * @param startDate The start date of the range (inclusive).
     * @param endDate The end date of the range (inclusive).
     * @returns A promise that resolves to an array of Tasks within the date range.
     */
    getTasksByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Task[]>;
}
