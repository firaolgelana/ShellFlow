import React from 'react'
import { WeeklyCalendar } from './WeeklyCalendar'
import { Timeline } from './Timeline'
import { QuickActionCards } from './QuickActionCards'

export function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Today's Shell Timeline</h1>
          <p className="text-muted-foreground">Monday, November 17, 2025</p>
        </div>

        {/* Quick Action Cards */}
        <QuickActionCards />

        {/* Weekly Calendar */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Week Overview</h2>
          <WeeklyCalendar />
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Task Timeline</h2>
          <Timeline />
        </div>
      </div>
    </main>
  )
}
