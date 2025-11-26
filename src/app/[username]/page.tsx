'use client';

import React from 'react';
import { usePublicProfile } from '@/features/profile/presentation/hooks/usePublicProfile';
import { PublicProfileView } from '@/features/profile/presentation/components/PublicProfileView';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Loader2 } from 'lucide-react';

interface PublicProfilePageProps {
    params: Promise<{
        username: string;
    }>;
}

/**
 * Public profile page accessible via /{username}
 * Displays a user's public profile information.
 */
export default function PublicProfilePage({ params }: PublicProfilePageProps) {
    const { username } = React.use(params);
    const { user, loading, error } = usePublicProfile(username);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card>
                    <CardContent className="pt-6 text-center">
                        <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
                        <p className="text-muted-foreground">
                            The user profile @{username} does not exist.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container max-w-5xl mx-auto py-8 px-4">
            <PublicProfileView user={user} />
        </div>
    );
}

