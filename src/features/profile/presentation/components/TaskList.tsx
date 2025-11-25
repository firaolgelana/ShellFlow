import React from 'react';
import { Task } from '@/features/profile/domain/Task';
import { Card } from '@/components/ui/card';

interface TaskListProps {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, loading, error }) => {
    if (loading) {
        return <div className="text-center py-4">Loading tasks...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">{error}</div>;
    }

    if (tasks.length === 0) {
        return <div className="text-gray-500 text-center py-4">No tasks found. Create one above!</div>;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Your Tasks</h3>
            {tasks.map((task) => (
                <Card key={task.id} className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-lg">{task.title}</h4>
                            <p className="text-gray-600 mt-1">{task.description}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                            {task.date.toLocaleDateString()} {task.date.toLocaleTimeString()}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
