import { Task } from '@/features/shells/domain/Task';
import { TaskRepository } from '@/features/shells/domain/TaskRepository';

/**
 * Use case for getting tasks for a specific day.
 * Defaults to today if no date is provided.
 */
export class GetDailyTasksUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(userId: string, date?: Date): Promise<Task[]> {
        if (!userId) {
            throw new Error('User ID is required');
        }

        const targetDate = date || new Date();
        return this.taskRepository.getTasksByDate(userId, targetDate);
    }
}
