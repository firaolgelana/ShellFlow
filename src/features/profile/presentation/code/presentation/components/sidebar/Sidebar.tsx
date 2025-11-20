import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface UserProfile {
  name: string
  role: string
  avatar: string
  stats: {
    tasksCompleted: number
    shellsCreated: number
    followers: number
  }
}

export function Sidebar() {
  const user: UserProfile = {
    name: 'Alex Johnson',
    role: 'Product Designer',
    avatar: '/professional-avatar.png',
    stats: {
      tasksCompleted: 127,
      shellsCreated: 14,
      followers: 348,
    },
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-6 overflow-y-auto">
      {/* Profile Section */}
      <Card className="p-5 mb-8 bg-card">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="w-16 h-16 rounded-full mb-3 object-cover"
          />
          <h2 className="text-lg font-semibold text-card-foreground mb-1">{user.name}</h2>
          <p className="text-sm text-muted-foreground mb-5">{user.role}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 w-full mb-5">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Tasks</p>
              <p className="text-lg font-bold text-primary">{user.stats.tasksCompleted}</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Shells</p>
              <p className="text-lg font-bold text-accent">{user.stats.shellsCreated}</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Followers</p>
              <p className="text-lg font-bold text-primary">{user.stats.followers}</p>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavItem label="Dashboard" icon="📊" active />
        <NavItem label="My Shells" icon="🐚" />
        <NavItem label="Templates" icon="📋" />
        <NavItem label="Activity" icon="📈" />
        <NavItem label="Settings" icon="⚙️" />
      </nav>

      {/* Help Section */}
      <Card className="p-4 mt-8 bg-accent/10 border-accent/20">
        <p className="text-sm font-medium text-foreground mb-2">Need Help?</p>
        <p className="text-xs text-muted-foreground mb-3">
          Check out our docs and tutorials to get started
        </p>
        <Button variant="outline" size="sm" className="w-full text-xs">
          View Docs
        </Button>
      </Card>
    </aside>
  )
}

function NavItem({
  label,
  icon,
  active = false,
}: {
  label: string
  icon: string
  active?: boolean
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
