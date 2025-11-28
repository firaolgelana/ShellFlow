'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useTaskStats } from '@/features/shells/presentation/hooks/useTaskStats';
import { useAuth } from '@/features/auth/presentation/useAuth';

export function WeeklyGraph() {
    const { user } = useAuth();
    const { stats, loading } = useTaskStats(user?.id);

    if (loading) {
        return (
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                        <p className="text-muted-foreground">Loading chart...</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.weeklyProgress}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="day"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            />
                            <Bar
                                dataKey="completed"
                                fill="#22c55e"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                            />
                            <Bar
                                dataKey="total"
                                fill="#e2e8f0"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
