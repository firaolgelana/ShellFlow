import { Task } from '@/features/shells/domain/Task';
import { TaskRepository } from '@/features/shells/domain/TaskRepository';

/**
 * Use case for getting tasks for the current week.
 * Week is defined as Monday to Sunday.
 */
export class GetWeeklyTasksUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(userId: string): Promise<Task[]> {
        if (!userId) {
            throw new Error('User ID is required');
        }

        const now = new Date();

        // Get the start of the week (Monday)
        const startOfWeek = new Date(now);
        const dayOfWeek = startOfWeek.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust when day is Sunday
        startOfWeek.setDate(startOfWeek.getDate() + diff);
        startOfWeek.setHours(0, 0, 0, 0);

        // Get the end of the week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return this.taskRepository.getTasksByDateRange(userId, startOfWeek, endOfWeek);
    }
}
