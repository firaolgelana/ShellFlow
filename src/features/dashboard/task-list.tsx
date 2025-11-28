'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { Search, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { useRecentTasks } from '@/features/shells/presentation/hooks/useRecentTasks';
import { useUpdateTaskStatus } from '@/features/shells/presentation/hooks/useUpdateTaskStatus';
import { useAuth } from '@/features/auth/presentation/useAuth';

export function TaskList() {
    const { user } = useAuth();
    const { tasks, loading, error, reload } = useRecentTasks(user?.id, 5);
    const { updateStatus } = useUpdateTaskStatus();
    const [searchQuery, setSearchQuery] = useState('');

    const handleStatusToggle = async (taskId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        try {
            await updateStatus(taskId, newStatus);
            reload(); // Refresh list to show updated status
        } catch (error) {
            console.error("Failed to toggle status", error);
        }
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading tasks...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-destructive">{error}</div>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                <p className="text-muted-foreground">
                    Create your first task to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search tasks..."
                            className="w-[200px] pl-9 md:w-[300px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Status</TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Duration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <button
                                        onClick={() => handleStatusToggle(task.id, task.status)}
                                        className={`rounded-full p-1 transition-colors ${task.status === 'completed'
                                            ? 'text-green-500 hover:text-green-600'
                                            : 'text-muted-foreground hover:text-primary'
                                            }`}
                                    >
                                        {task.status === 'completed' ? (
                                            <CheckCircle2 className="h-5 w-5" />
                                        ) : (
                                            <div className="h-5 w-5 rounded-full border-2 border-current" />
                                        )}
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <div className={task.status === 'completed' ? 'opacity-50 line-through' : ''}>
                                        <div className="font-medium">{task.title}</div>
                                        {task.description && (
                                            <div className="text-sm text-muted-foreground line-clamp-1">
                                                {task.description}
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="capitalize">
                                        {task.category || 'work'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(task.date).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        {task.startTime}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {task.duration} min
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {filteredTasks.length === 0 && searchQuery && (
                <div className="text-center py-4 text-muted-foreground">
                    No tasks found matching "{searchQuery}"
                </div>
            )}
        </div>
    );
}
