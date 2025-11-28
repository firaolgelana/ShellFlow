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
}
