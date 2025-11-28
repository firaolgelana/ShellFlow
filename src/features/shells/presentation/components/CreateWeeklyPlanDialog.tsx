'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { useCreateTask } from '@/features/shells/presentation/hooks/useCreateTask';
import { useAuth } from '@/features/auth/presentation/useAuth';
import { Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';

interface CreateWeeklyPlanDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

interface DailyTask {
    title: string;
    description: string;
    startTime: string;
    duration: number;
}

export function CreateWeeklyPlanDialog({ open, onOpenChange, onSuccess }: CreateWeeklyPlanDialogProps) {
    const { user } = useAuth();
    const { createTask, loading } = useCreateTask();
    const [currentDayIndex, setCurrentDayIndex] = useState(0);
    const [tasksByDay, setTasksByDay] = useState<Record<number, DailyTask[]>>({});
    const [currentTask, setCurrentTask] = useState<DailyTask>({
        title: '',
        description: '',
        startTime: '09:00',
        duration: 30
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate next 7 days starting from today
    const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    const currentDay = days[currentDayIndex];

    const handleAddTask = () => {
        if (!currentTask.title) return;

        setTasksByDay(prev => ({
            ...prev,
            [currentDayIndex]: [...(prev[currentDayIndex] || []), currentTask]
        }));

        // Reset current task form
        setCurrentTask({
            title: '',
            description: '',
            startTime: '09:00',
            duration: 30
        });
    };

    const handleNextDay = () => {
        if (currentDayIndex < 6) {
            setCurrentDayIndex(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSkipDay = () => {
        if (currentDayIndex < 6) {
            setCurrentDayIndex(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (!user) return;
        setIsSubmitting(true);

        try {
            // Iterate through all days and create tasks
            for (let i = 0; i < 7; i++) {
                const dayTasks = tasksByDay[i] || [];
                const taskDate = days[i];

                for (const task of dayTasks) {
                    await createTask(
                        user.id,
                        task.title,
                        task.description,
                        taskDate,
                        task.startTime,
                        task.duration
                    );
                }
            }

            onOpenChange(false);
            onSuccess?.();

            // Reset state
            setCurrentDayIndex(0);
            setTasksByDay({});
            setCurrentTask({
                title: '',
                description: '',
                startTime: '09:00',
                duration: 30
            });

        } catch (error) {
            console.error('Failed to create weekly plan:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create Weekly Plan</DialogTitle>
                    <DialogDescription>
                        Plan your tasks for the next 7 days. You can add multiple tasks per day or skip days.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            {currentDay.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                            Day {currentDayIndex + 1} of 7
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-secondary h-2 rounded-full mb-6">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentDayIndex + 1) / 7) * 100}%` }}
                        />
                    </div>

                    {/* Current Day Tasks List */}
                    <div className="mb-6 space-y-2">
                        {tasksByDay[currentDayIndex]?.map((task, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                                <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-xs text-muted-foreground">{task.startTime} • {task.duration} min</p>
                                </div>
                            </div>
                        ))}
                        {(!tasksByDay[currentDayIndex] || tasksByDay[currentDayIndex].length === 0) && (
                            <p className="text-sm text-muted-foreground italic text-center py-2">
                                No tasks added for this day yet.
                            </p>
                        )}
                    </div>

                    {/* Add Task Form */}
                    <div className="space-y-4 border p-4 rounded-lg bg-card">
                        <div className="grid gap-2">
                            <Label htmlFor="task-title">Task Title</Label>
                            <Input
                                id="task-title"
                                value={currentTask.title}
                                onChange={(e) => setCurrentTask(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="e.g., Morning Standup"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="task-time">Start Time</Label>
                                <Input
                                    id="task-time"
                                    type="time"
                                    value={currentTask.startTime}
                                    onChange={(e) => setCurrentTask(prev => ({ ...prev, startTime: e.target.value }))}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="task-duration">Duration (min)</Label>
                                <Input
                                    id="task-duration"
                                    type="number"
                                    min="5"
                                    value={currentTask.duration}
                                    onChange={(e) => setCurrentTask(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                                />
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full"
                            onClick={handleAddTask}
                            disabled={!currentTask.title}
                        >
                            Add Task to {currentDay.toLocaleDateString(undefined, { weekday: 'short' })}
                        </Button>
                    </div>
                </div>

                <DialogFooter className="flex justify-between items-center sm:justify-between mt-6">
                    <Button variant="ghost" onClick={handleSkipDay}>
                        Skip {currentDayIndex === 6 ? '& Finish' : 'Day'}
                    </Button>
                    <div className="flex gap-2">
                        {currentDayIndex > 0 && (
                            <Button variant="outline" onClick={() => setCurrentDayIndex(prev => prev - 1)}>
                                Previous
                            </Button>
                        )}
                        <Button onClick={handleNextDay} disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : (currentDayIndex === 6 ? 'Finish Plan' : 'Next Day')}
                            {!isSubmitting && currentDayIndex < 6 && <ChevronRight className="ml-2 h-4 w-4" />}
                            {!isSubmitting && currentDayIndex === 6 && <CheckCircle2 className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
