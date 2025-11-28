'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/features/shells/domain/Task';
import { useTasks } from './useTasks';

export interface TaskStats {
    totalToday: number;
    completedToday: number;
    pendingToday: number;
    overdue: number;
    weeklyProgress: {
        day: string;
        completed: number;
        total: number;
    }[];
}

export function useTaskStats(userId: string | undefined) {
    const { tasks, loading, reload } = useTasks(userId);
    const [stats, setStats] = useState<TaskStats>({
        totalToday: 0,
        completedToday: 0,
        pendingToday: 0,
        overdue: 0,
        weeklyProgress: [],
    });

    useEffect(() => {
        if (!tasks) return;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Calculate today's stats
        const todaysTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return (
                taskDate.getDate() === today.getDate() &&
                taskDate.getMonth() === today.getMonth() &&
                taskDate.getFullYear() === today.getFullYear()
            );
        });

        const totalToday = todaysTasks.length;
        const completedToday = todaysTasks.filter(t => t.status === 'completed').length;
        const pendingToday = todaysTasks.filter(t => t.status === 'pending').length;

        // Calculate overdue tasks (pending tasks from before today)
        const overdue = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return task.status === 'pending' && taskDate < today;
        }).length;

        // Calculate weekly progress
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
        startOfWeek.setHours(0, 0, 0, 0);

        const weeklyProgress = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(startOfWeek);
            currentDay.setDate(startOfWeek.getDate() + i);

            const dayTasks = tasks.filter(task => {
                const taskDate = new Date(task.date);
                return (
                    taskDate.getDate() === currentDay.getDate() &&
                    taskDate.getMonth() === currentDay.getMonth() &&
                    taskDate.getFullYear() === currentDay.getFullYear()
                );
            });

            weeklyProgress.push({
                day: days[i],
                total: dayTasks.length,
                completed: dayTasks.filter(t => t.status === 'completed').length,
            });
        }

        setStats({
            totalToday,
            completedToday,
            pendingToday,
            overdue,
            weeklyProgress,
        });

    }, [tasks]);

    return {
        stats,
        loading,
        reload,
    };
}
