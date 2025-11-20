"use client"; // ⚡ Must be at the very top

import React from 'react'
import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', completion: 78 },
  { day: 'Tue', completion: 82 },
  { day: 'Wed', completion: 75 },
  { day: 'Thu', completion: 88 },
  { day: 'Fri', completion: 85 },
  { day: 'Sat', completion: 70 },
  { day: 'Sun', completion: 92 },
]

export function Analytics() {
  const avgCompletion = Math.round(data.reduce((sum, d) => sum + d.completion, 0) / data.length)

  return (
    <Card className="p-4 bg-card">
      <div className="mb-4">
        <div className="flex items-end justify-between mb-2">
          <span className="text-2xl font-bold text-primary">{avgCompletion}%</span>
          <span className="text-xs text-accent font-medium">+8% this week</span>
        </div>
        <p className="text-xs text-muted-foreground">Task Completion Rate</p>
      </div>

      {/* Mini Chart */}
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <Line
              type="monotone"
              dataKey="completion"
              stroke="var(--color-primary)"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
