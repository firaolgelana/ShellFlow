'use client';

import React from 'react';
import { User } from '@/features/auth/domain/User';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Calendar, Users } from 'lucide-react';

interface PublicProfileViewProps {
    user: User;
}

/**
 * Component to display a public user profile.
 * Shows avatar, username, bio, and public activity.
 */
export function PublicProfileView({ user }: PublicProfileViewProps) {
    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.photoURL} alt={user.displayName || user.username} />
                            <AvatarFallback className="text-2xl">
                                {(user.displayName || user.username || user.email)?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                <h1 className="text-3xl font-bold">
                                    {user.displayName || user.username}
                                </h1>
                                {user.username && (
                                    <span className="text-muted-foreground">@{user.username}</span>
                                )}
                            </div>

                            <p className="text-muted-foreground mb-4">
                                {user.email}
                            </p>

                            {user.bio && (
                                <p className="text-foreground mb-4">
                                    {user.bio}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        Joined {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Public Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Public Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No public activity yet.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
