import React from 'react';
import { ShellCard } from './ShellCard';
import { ShellCard as ShellCardType } from '../types';

interface ProfileShellGridProps {
    shells: ShellCardType[];
    onCopy?: (shellId: string) => void;
}

export const ProfileShellGrid: React.FC<ProfileShellGridProps> = ({ shells, onCopy }) => {
    if (shells.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">No shells yet</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shells.map((shell) => (
                <ShellCard
                    key={shell.shell.id}
                    card={shell}
                    onCopy={() => onCopy?.(shell.shell.id)}
                />
            ))}
        </div>
    );
};
