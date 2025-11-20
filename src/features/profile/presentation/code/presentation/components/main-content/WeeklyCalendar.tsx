import React from 'react'
import { Card } from '@/components/ui/card'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dates = [11, 12, 13, 14, 15, 16, 17]
const tasks = [4, 6, 3, 5, 7, 2, 8]

export function WeeklyCalendar() {
  return (
    <Card className="p-6 bg-card">
      <div className="grid grid-cols-7 gap-3">
        {weekDays.map((day, index) => {
          const isToday = index === 0
          return (
            <div
              key={day}
              className={`text-center p-4 rounded-lg transition-all ${
                isToday
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <p className="text-xs font-semibold mb-2 opacity-90">{day}</p>
              <p className={`text-2xl font-bold mb-2 ${isToday ? 'text-primary-foreground' : ''}`}>
                {dates[index]}
              </p>
              <div
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                  isToday
                    ? 'bg-primary-foreground text-primary'
                    : 'bg-accent/20 text-accent'
                }`}
              >
                {tasks[index]}
              </div>
              <p className="text-xs text-muted-foreground mt-2 opacity-70">tasks</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
