import React from 'react'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Circle } from 'lucide-react'

interface TimelineItem {
  id: number
  time: string
  title: string
  shell: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    time: '9:00 AM',
    title: 'Review Q4 Analytics Report',
    shell: 'Business Planning',
    completed: true,
    priority: 'high',
  },
  {
    id: 2,
    time: '10:30 AM',
    title: 'Team Design Sync Meeting',
    shell: 'Team Meetings',
    completed: true,
    priority: 'high',
  },
  {
    id: 3,
    time: '12:00 PM',
    title: 'Lunch Break',
    shell: 'Personal',
    completed: false,
    priority: 'low',
  },
  {
    id: 4,
    time: '1:30 PM',
    title: 'Design System Improvements',
    shell: 'Product Development',
    completed: false,
    priority: 'high',
  },
  {
    id: 5,
    time: '3:00 PM',
    title: 'Client Presentation Prep',
    shell: 'Client Work',
    completed: false,
    priority: 'medium',
  },
  {
    id: 6,
    time: '4:30 PM',
    title: 'Code Review',
    shell: 'Engineering',
    completed: false,
    priority: 'medium',
  },
]

export function Timeline() {
  return (
    <Card className="p-6 bg-card">
      <div className="space-y-4">
        {timelineItems.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            {/* Timeline line and dot */}
            <div className="flex flex-col items-center">
              <button className="p-1 rounded-full hover:bg-muted transition-colors">
                {item.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground" />
                )}
              </button>
              {index !== timelineItems.length - 1 && (
                <div className="w-0.5 h-12 bg-border mt-2"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">{item.time}</p>
                  <p
                    className={`text-base font-medium mt-1 ${
                      item.completed
                        ? 'text-muted-foreground line-through'
                        : 'text-card-foreground'
                    }`}
                  >
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {item.shell}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.priority === 'high'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : item.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
