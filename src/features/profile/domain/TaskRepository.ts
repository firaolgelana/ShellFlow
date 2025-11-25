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
     * Creates a new task.
     * @param task The task to create.
     * @returns A promise that resolves when the task is created.
     */
    createTask(task: Task): Promise<void>;
}
