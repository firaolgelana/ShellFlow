import { Task } from '@/features/profile/domain/Task';
import { TaskRepository } from '@/features/profile/domain/TaskRepository';

/**
 * Use case for retrieving tasks for a specific user.
 */
export class GetUserTasksUseCase {
    constructor(private taskRepository: TaskRepository) { }

    /**
     * Executes the use case.
     * @param userId The ID of the user to retrieve tasks for.
     * @returns A promise that resolves to an array of Tasks.
     */
    async execute(userId: string): Promise<Task[]> {
        if (!userId) {
            throw new Error('User ID is required to get tasks');
        }
        return this.taskRepository.getTasks(userId);
    }
}
