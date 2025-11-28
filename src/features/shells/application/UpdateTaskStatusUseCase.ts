import { TaskRepository } from '@/features/shells/domain/TaskRepository';
import { Task } from '@/features/shells/domain/Task';

export class UpdateTaskStatusUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(taskId: string, status: Task['status']): Promise<void> {
        if (!taskId) {
            throw new Error('Task ID is required');
        }
        await this.taskRepository.updateTaskStatus(taskId, status);
    }
}
