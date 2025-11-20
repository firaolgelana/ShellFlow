import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Follower {
  id: number
  name: string
  avatar: string
  status: string
  isFollowing: boolean
}

const followers: Follower[] = [
  {
    id: 1,
    name: 'Jessica Chen',
    avatar: '/follower-1.jpg',
    status: 'Active now',
    isFollowing: true,
  },
  {
    id: 2,
    name: 'Tom Wilson',
    avatar: '/follower-2.jpg',
    status: 'Active 2h ago',
    isFollowing: true,
  },
  {
    id: 3,
    name: 'Lisa Park',
    avatar: '/follower-3.jpg',
    status: 'Active 5m ago',
    isFollowing: false,
  },
]

export function Followers() {
  return (
    <div className="space-y-3">
      {followers.map((follower) => (
        <Card key={follower.id} className="p-4 bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <img
                src={follower.avatar || "/placeholder.svg"}
                alt={follower.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-card"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-card-foreground truncate">{follower.name}</p>
              <p className="text-xs text-muted-foreground">{follower.status}</p>
            </div>
          </div>
          <Button
            size="sm"
            variant={follower.isFollowing ? 'outline' : 'default'}
            className="w-full text-xs"
          >
            {follower.isFollowing ? 'Following' : 'Follow'}
          </Button>
        </Card>
      ))}
    </div>
  )
}
