'use client';

import { Plus, CalendarDays, Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

export function QuickActions() {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button className="w-full gap-2" size="lg">
                    <Plus className="h-4 w-4" />
                    Add New Task
                </Button>
                <Button variant="outline" className="w-full gap-2" size="lg">
                    <CalendarDays className="h-4 w-4" />
                    Create Weekly Plan
                </Button>
                <Button variant="secondary" className="w-full gap-2 bg-purple-100 text-purple-900 hover:bg-purple-200" size="lg">
                    <Sparkles className="h-4 w-4" />
                    Auto-Schedule
                </Button>
                <Button variant="ghost" className="w-full gap-2" size="lg">
                    <CalendarIcon className="h-4 w-4" />
                    View Calendar
                </Button>
            </CardContent>
        </Card>
    );
}
