'use client';

import * as React from 'react';
import { Calendar } from '@/shared/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useTasks } from '@/features/shells/presentation/hooks/useTasks';
import { useAuth } from '@/features/auth/presentation/useAuth';
import { Badge } from '@/shared/components/ui/badge';
import { Clock } from 'lucide-react';

export function CalendarView() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const { user } = useAuth();
    const { tasks, loading } = useTasks(user?.id);

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

    // Create a set of dates that have tasks for the calendar modifiers
    const daysWithTasks = React.useMemo(() => {
        if (!tasks) return [];
        return tasks.map(task => new Date(task.date));
    }, [tasks]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground">
                        Manage your schedule and upcoming tasks.
                    </p>
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
                            {date ? (
                                <span>Events for {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            ) : (
                                <span>Upcoming Events</span>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">
                            {!date && <p>Select a date to view events.</p>}

                            {loading ? (
                                <p>Loading tasks...</p>
                            ) : tasksForDate.length > 0 ? (
                                <div className="mt-4 space-y-3">
                                    {tasksForDate.map(task => (
                                        <div key={task.id} className="p-3 border rounded-md bg-muted/50 flex flex-col gap-1">
                                            <div className="flex justify-between items-start">
                                                <p className="font-medium text-foreground">{task.title}</p>
                                                <Badge variant="outline">{task.duration} min</Badge>
                                            </div>
                                            {task.description && (
                                                <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                                            )}
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{task.startTime}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : date && (
                                <div className="py-8 text-center">
                                    <p>No events scheduled for this day.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
