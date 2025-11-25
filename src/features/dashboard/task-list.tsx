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
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { CheckCircle2, Circle, MoreHorizontal, Search, Filter } from 'lucide-react';
import { mockTasks } from '@/lib/mock-data';
import { cn } from '@/shared/lib/utils';

export function TaskList() {
    const [filter, setFilter] = useState('All');

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search tasks..."
                            className="w-[200px] pl-9 md:w-[300px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setFilter('All')}>
                                All
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('High')}>
                                High Priority
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('Pending')}>
                                Pending
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockTasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            'h-8 w-8',
                                            task.status === 'Done'
                                                ? 'text-green-500 hover:text-green-600'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        {task.status === 'Done' ? (
                                            <CheckCircle2 className="h-5 w-5" />
                                        ) : (
                                            <Circle className="h-5 w-5" />
                                        )}
                                    </Button>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className={cn(task.status === 'Done' && 'text-muted-foreground line-through')}>
                                        {task.title}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-slate-50">
                                        {task.category}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        className={cn(
                                            task.priority === 'High'
                                                ? 'bg-red-100 text-red-700 hover:bg-red-100'
                                                : task.priority === 'Medium'
                                                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                                    : 'bg-green-100 text-green-700 hover:bg-green-100'
                                        )}
                                    >
                                        {task.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
