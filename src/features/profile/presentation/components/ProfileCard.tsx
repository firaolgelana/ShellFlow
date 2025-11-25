import React from 'react';
import { User } from '@/features/auth/domain/User';
import { Card } from '@/components/ui/card';

interface ProfileCardProps {
    user: User;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    return (
        <Card className="p-6 mb-6">
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            <div className="space-y-2">
                <div>
                    <span className="font-semibold">Email:</span> {user.email}
                </div>
                <div>
                    <span className="font-semibold">User ID:</span> {user.id}
                </div>
                {user.displayName && (
                    <div>
                        <span className="font-semibold">Name:</span> {user.displayName}
                    </div>
                )}
            </div>
        </Card>
    );
};
