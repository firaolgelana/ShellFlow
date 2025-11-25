'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/features/shells/domain/Task';
import { GetTasksUseCase } from '@/features/shells/application/GetTasksUseCase';
import { FirebaseTaskRepository } from '@/features/shells/infrastructure/FirebaseTaskRepository';

const taskRepository = new FirebaseTaskRepository();
const getTasksUseCase = new GetTasksUseCase(taskRepository);

export function useTasks(userId: string | undefined) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadTasks = useCallback(async () => {
        if (!userId) {
            setLoading(false);
            setTasks([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const allTasks = await getTasksUseCase.execute(userId);
            setTasks(allTasks);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load tasks';
            setError(errorMessage);
            console.error('Error loading tasks:', err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    return {
        tasks,
        loading,
        error,
        reload: loadTasks,
    };
}
