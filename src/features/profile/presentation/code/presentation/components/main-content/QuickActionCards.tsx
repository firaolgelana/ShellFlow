import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const actions = [
  {
    id: 1,
    title: 'Create New Shell',
    description: 'Start a new task shell',
    icon: '🆕',
    color: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30',
  },
  {
    id: 2,
    title: 'Edit Tasks',
    description: 'Modify your current tasks',
    icon: '✏️',
    color: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30',
  },
  {
    id: 3,
    title: 'Share Shell',
    description: 'Share with community',
    icon: '📤',
    color: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30',
  },
  {
    id: 4,
    title: 'Browse Templates',
    description: 'Explore templates',
    icon: '📚',
    color: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/30',
  },
]

export function QuickActionCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {actions.map((action) => (
        <Card
          key={action.id}
          className="p-5 hover:shadow-md transition-all cursor-pointer group bg-card hover:bg-card/80"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{action.icon}</span>
          </div>
          <h3 className="font-semibold text-card-foreground text-sm mb-1 group-hover:text-primary transition-colors">
            {action.title}
          </h3>
          <p className="text-xs text-muted-foreground">{action.description}</p>
        </Card>
      ))}
    </div>
  )
}
