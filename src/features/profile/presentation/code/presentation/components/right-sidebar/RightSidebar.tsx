"use client"
import React from 'react'
import { Card } from '@/components/ui/card'
import { CommunityShells } from './CommunityShells'
import { Followers } from './Followers'
import { Analytics } from './Analytics'

export function RightSidebar() {
  return (
    <aside className="w-72 bg-sidebar border-l border-sidebar-border p-6 overflow-y-auto">
      {/* Analytics */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Performance</h3>
        <Analytics />
      </div>

      {/* Community Shells */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Community Shells</h3>
        <CommunityShells />
      </div>

      {/* Followers */}
      <div>
        <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Top Followers</h3>
        <Followers />
      </div>
    </aside>
  )
}
