import { Task } from '@/features/shells/domain/Task';
import { TaskRepository } from '@/features/shells/domain/TaskRepository';

/**
 * Use case for creating a new task.
 * Validates input and delegates to the repository.
 */
export class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    /**
     * Executes the use case.
     * @param task The task to create
     * @returns A promise that resolves when the task is created.
     */
    async execute(task: Task): Promise<void> {
        // Validation
        if (!task.title || task.title.trim().length === 0) {
            throw new Error('Task title is required');
        }

        if (task.title.length > 100) {
            throw new Error('Task title must be less than 100 characters');
        }

        if (task.description.length > 500) {
            throw new Error('Task description must be less than 500 characters');
        }

        if (task.duration <= 0 || task.duration > 1440) {
            throw new Error('Duration must be between 1 and 1440 minutes (24 hours)');
        }

        // Validate time format (HH:MM)
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!task.startTime || !timeRegex.test(task.startTime)) {
            throw new Error('Invalid time format. Use HH:MM (24-hour format)');
        }

        if (!task.userId) {
            throw new Error('User ID is required to create a task');
        }

        // Ensure strings are trimmed
        const taskToCreate: Task = {
            ...task,
            title: task.title.trim(),
            description: task.description.trim(),
        };

        return this.taskRepository.createTask(taskToCreate);
    }
}
