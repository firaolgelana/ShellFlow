import { Task } from '@/features/shells/domain/Task';
import { TaskRepository } from '@/features/shells/domain/TaskRepository';

export class GetTasksUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(userId: string): Promise<Task[]> {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return this.taskRepository.getTasks(userId);
    }
}
