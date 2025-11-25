'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { mockStats } from '@/lib/mock-data';

export function StatsCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                    <ListTodo className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockStats.totalToday}</div>
                    <p className="text-xs text-muted-foreground">
                        Tasks scheduled for today
                    </p>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockStats.completedToday}</div>
                    <p className="text-xs text-muted-foreground">
                        Tasks completed today
                    </p>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockStats.pendingToday}</div>
                    <p className="text-xs text-muted-foreground">
                        Tasks remaining
                    </p>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockStats.overdue}</div>
                    <p className="text-xs text-muted-foreground">
                        Tasks past deadline
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
