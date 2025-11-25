import { Task } from '@/features/profile/domain/Task';
import { TaskRepository } from '@/features/profile/domain/TaskRepository';

/**
 * Use case for creating a new task.
 */
export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    /**
     * Executes the use case.
     * @param task The task to create.
     * @returns A promise that resolves when the task is created.
     */
    async execute(task: Task): Promise<void> {
        if (!task.title) {
            throw new Error('Task title is required');
        }
        if (!task.userId) {
            throw new Error('User ID is required to create a task');
        }
        return this.taskRepository.createTask(task);
    }
}
