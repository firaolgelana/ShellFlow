import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

interface CommunityShell {
  id: number
  title: string
  creator: string
  avatar: string
  likes: number
  tasks: number
  liked: boolean
}

const shells: CommunityShell[] = [
  {
    id: 1,
    title: 'Morning Productivity',
    creator: 'Sarah M.',
    avatar: '/user-avatar-1.png',
    likes: 234,
    tasks: 6,
    liked: false,
  },
  {
    id: 2,
    title: 'Fitness Challenge',
    creator: 'Mike D.',
    avatar: '/diverse-user-avatar-set-2.png',
    likes: 156,
    tasks: 5,
    liked: true,
  },
  {
    id: 3,
    title: 'Learning Goals',
    creator: 'Emma L.',
    avatar: '/diverse-user-avatars-3.png',
    likes: 189,
    tasks: 8,
    liked: false,
  },
]

export function CommunityShells() {
  return (
    <div className="space-y-3">
      {shells.map((shell) => (
        <Card key={shell.id} className="p-4 bg-card hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 mb-3">
            <img
              src={shell.avatar || "/placeholder.svg"}
              alt={shell.creator}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-card-foreground truncate">{shell.title}</p>
              <p className="text-xs text-muted-foreground">by {shell.creator}</p>
            </div>
            <button className="p-1 hover:bg-muted rounded transition-colors">
              <Heart
                className={`w-4 h-4 ${
                  shell.liked
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground hover:text-accent'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{shell.tasks} tasks</span>
            <span className="font-medium text-primary">{shell.likes} likes</span>
          </div>
        </Card>
      ))}
      <Button className="w-full mt-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
        Browse All
      </Button>
    </div>
  )
}
