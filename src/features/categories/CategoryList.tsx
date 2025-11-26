'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { useTasks } from '@/features/shells/presentation/hooks/useTasks';
import { useAuth } from '@/features/auth/presentation/useAuth';

// Predefined categories – could be fetched from a DB in a real app.
const CATEGORIES = ['work', 'personal', 'learning', 'health'];

export function CategoryList() {
    const { user } = useAuth();
    const { tasks, loading, error } = useTasks(user?.id);

    // Group tasks by category (fallback to "uncategorized").
    const tasksByCategory = React.useMemo(() => {
        const map: Record<string, typeof tasks> = {};
        CATEGORIES.forEach((cat) => (map[cat] = []));
        if (tasks) {
            tasks.forEach((task) => {
                const cat = (task as any).category?.toLowerCase() || 'uncategorized';
                if (!map[cat]) map[cat] = [];
                map[cat].push(task);
            });
        }
        return map;
    }, [tasks]);

    if (loading) {
        return <p className="text-muted-foreground">Loading categories...</p>;
    }
    if (error) {
        return <p className="text-destructive">{error}</p>;
    }

    return (
        <div className="space-y-6">
            {CATEGORIES.map((category) => (
                <Card key={category}>
                    <CardHeader>
                        <CardTitle className="capitalize">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tasksByCategory[category] && tasksByCategory[category].length > 0 ? (
                            <ul className="space-y-2">
                                {tasksByCategory[category].map((task) => (
                                    <li key={task.id} className="flex justify-between items-center">
                                        <span>{task.title}</span>
                                        <Badge variant="outline">{task.duration} min</Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">No tasks in this category.</p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
