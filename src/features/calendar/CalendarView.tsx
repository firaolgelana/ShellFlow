'use client';

import * as React from 'react';
import { Calendar } from '@/shared/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useTasks } from '@/features/shells/presentation/hooks/useTasks';
import { useAuth } from '@/features/auth/presentation/useAuth';
import { Badge } from '@/shared/components/ui/badge';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { useRecentTasks } from '@/features/shells/presentation/hooks/useRecentTasks';
import { Button } from '@/shared/components/ui/button';

export function CalendarView() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [viewMode, setViewMode] = React.useState<'day' | 'week' | 'recent'>('day');
    const { user } = useAuth();
    const { tasks, loading: tasksLoading } = useTasks(user?.id);
    const { tasks: recentTasks, loading: recentLoading } = useRecentTasks(user?.id, 10);

    // Filter tasks for the selected date
    const tasksForDate = React.useMemo(() => {
        if (!date || !tasks) return [];
        return tasks.filter(task => {
            const taskDate = new Date(task.date);
            return (
                taskDate.getDate() === date.getDate() &&
                taskDate.getMonth() === date.getMonth() &&
                taskDate.getFullYear() === date.getFullYear()
            );
        });
    }, [date, tasks]);

    // Filter tasks for the selected week
    const tasksForWeek = React.useMemo(() => {
        if (!date || !tasks) return [];
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); // Sunday
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
        endOfWeek.setHours(23, 59, 59, 999);

        return tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= startOfWeek && taskDate <= endOfWeek;
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [date, tasks]);

    // Create a set of dates that have tasks for the calendar modifiers
    const daysWithTasks = React.useMemo(() => {
        if (!tasks) return [];
        return tasks.map(task => new Date(task.date));
    }, [tasks]);

    const renderTaskList = (taskList: typeof tasks, emptyMessage: string) => {
        if (taskList.length === 0) {
            return (
                <div className="py-8 text-center">
                    <p>{emptyMessage}</p>
                </div>
            );
        }

        return (
            <div className="mt-4 space-y-3">
                {taskList.map(task => (
                    <div key={task.id} className="p-3 border rounded-md bg-muted/50 flex flex-col gap-1">
                        <div className="flex justify-between items-start">
                            <p className="font-medium text-foreground">{task.title}</p>
                            <Badge variant="outline">{task.duration} min</Badge>
                        </div>
                        {task.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                <span>{new Date(task.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{task.startTime}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground">
                        Manage your schedule and upcoming tasks.
                    </p>
                </div>
                <div className="flex gap-2 bg-muted p-1 rounded-lg">
                    <Button
                        variant={viewMode === 'day' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('day')}
                    >
                        Day
                    </Button>
                    <Button
                        variant={viewMode === 'week' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('week')}
                    >
                        Week
                    </Button>
                    <Button
                        variant={viewMode === 'recent' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('recent')}
                    >
                        Recent
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Calendar</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            modifiers={{
                                hasTask: daysWithTasks
                            }}
                            modifiersStyles={{
                                hasTask: {
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    color: 'var(--primary)'
                                }
                            }}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {viewMode === 'day' && (
                                date ? (
                                    <span>Events for {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                ) : <span>Select a date</span>
                            )}
                            {viewMode === 'week' && (
                                date ? (
                                    <span>Week of {date.toLocaleDateString()}</span>
                                ) : <span>Select a date</span>
                            )}
                            {viewMode === 'recent' && <span>Recently Added Tasks</span>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">
                            {viewMode === 'day' && (
                                !date ? <p>Select a date to view events.</p> :
                                    tasksLoading ? <p>Loading tasks...</p> :
                                        renderTaskList(tasksForDate, "No events scheduled for this day.")
                            )}

                            {viewMode === 'week' && (
                                !date ? <p>Select a date to view the week's events.</p> :
                                    tasksLoading ? <p>Loading tasks...</p> :
                                        renderTaskList(tasksForWeek, "No events scheduled for this week.")
                            )}

                            {viewMode === 'recent' && (
                                recentLoading ? <p>Loading recent tasks...</p> :
                                    renderTaskList(recentTasks, "No recent tasks found.")
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
