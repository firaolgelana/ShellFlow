'use client';

import React from 'react'
import { Card } from '@/shared/components/ui/card'
import { Task } from '@/features/profile/domain/Task'

interface ProfileRightSidebarProps {
    tasks: Task[];
}

export function ProfileRightSidebar({ tasks }: ProfileRightSidebarProps) {
    const completedTasks = 0; // Placeholder - would need completion status in Task entity
    const totalTasks = tasks.length;
    const upcomingTasks = tasks.slice(0, 3); // Show next 3 tasks

    return (
        <aside className="w-72 bg-sidebar border-l border-sidebar-border p-6 overflow-y-auto">
            {/* Analytics */}
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Performance</h3>
                <Card className="p-4 bg-card">
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Tasks Completed</span>
                                <span className="font-semibold">{completedTasks}/{totalTasks}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%' }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-muted rounded-lg p-3">
                                <p className="text-xs text-muted-foreground mb-1">Total</p>
                                <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
                            </div>
                            <div className="bg-muted rounded-lg p-3">
                                <p className="text-xs text-muted-foreground mb-1">Done</p>
                                <p className="text-2xl font-bold text-primary">{completedTasks}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Upcoming Tasks */}
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Upcoming Tasks</h3>
                <div className="space-y-3">
                    {upcomingTasks.length > 0 ? (
                        upcomingTasks.map((task) => (
                            <Card key={task.id} className="p-3 bg-card hover:bg-accent/5 transition-colors">
                                <p className="text-sm font-medium text-foreground mb-1 truncate">{task.title}</p>
                                <p className="text-xs text-muted-foreground">
                                    {task.date.toLocaleDateString()}
                                </p>
                            </Card>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No upcoming tasks</p>
                    )}
                </div>
            </div>

            {/* Quick Stats */}
            <div>
                <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Activity</h3>
                <Card className="p-4 bg-card">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Tasks Created</span>
                            <span className="text-sm font-semibold text-foreground">{totalTasks}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">This Week</span>
                            <span className="text-sm font-semibold text-accent">0</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Streak</span>
                            <span className="text-sm font-semibold text-primary">0 days</span>
                        </div>
                    </div>
                </Card>
            </div>
        </aside>
    )
}
