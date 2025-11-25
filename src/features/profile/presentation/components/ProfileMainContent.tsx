'use client';

import React from 'react'
import { Task } from '@/features/profile/domain/Task'
import { TaskForm } from './TaskForm'
import { TaskList } from './TaskList'

interface ProfileMainContentProps {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    onCreateTask: (title: string, description: string, date: Date) => Promise<void>;
}

export function ProfileMainContent({ tasks, loading, error, onCreateTask }: ProfileMainContentProps) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <main className="flex-1 overflow-y-auto">
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">My Task Dashboard</h1>
                    <p className="text-muted-foreground">{formattedDate}</p>
                </div>

                {/* Task Creation Form */}
                <div className="mb-8">
                    <TaskForm onCreateTask={onCreateTask} />
                </div>

                {/* Task List */}
                <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Your Tasks</h2>
                    <TaskList tasks={tasks} loading={loading} error={error} />
                </div>
            </div>
        </main>
    )
}
