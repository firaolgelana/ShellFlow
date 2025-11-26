'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/presentation/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { User, Mail, AtSign, Check, X, Loader2 } from 'lucide-react';
import { useUpdateUsername } from '@/features/profile/presentation/hooks/useUpdateUsername';
import { toast } from 'sonner';

export function AccountSettings() {
    const { user } = useAuth();
    const { updateUsername, validateFormat, checkAvailability, loading, error } = useUpdateUsername();

    const [usernameInput, setUsernameInput] = useState('');
    const [usernameValidation, setUsernameValidation] = useState<{
        isValid: boolean;
        error?: string;
    } | null>(null);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [checkingAvailability, setCheckingAvailability] = useState(false);

    // Initialize username input from user data
    useEffect(() => {
        if (user?.username) {
            setUsernameInput(user.username);
        }
    }, [user?.username]);

    // Validate username format on change
    useEffect(() => {
        if (!usernameInput) {
            setUsernameValidation(null);
            setIsAvailable(null);
            return;
        }

        const validation = validateFormat(usernameInput);
        setUsernameValidation(validation);

        // Only check availability if format is valid and different from current
        if (validation.isValid && usernameInput.toLowerCase() !== user?.username?.toLowerCase()) {
            setCheckingAvailability(true);
            const debounce = setTimeout(async () => {
                const available = await checkAvailability(usernameInput);
                setIsAvailable(available);
                setCheckingAvailability(false);
            }, 500);

            return () => clearTimeout(debounce);
        } else if (usernameInput.toLowerCase() === user?.username?.toLowerCase()) {
            setIsAvailable(true); // Current username is "available" for user
        } else {
            setIsAvailable(null);
        }
    }, [usernameInput, user?.username, validateFormat, checkAvailability]);

    const handleSaveUsername = async () => {
        if (!user?.id || !usernameInput) return;

        const success = await updateUsername(user.id, usernameInput);
        if (success) {
            toast.success('Username updated successfully!');
        } else {
            toast.error(error || 'Failed to update username');
        }
    };

    const canSave =
        usernameValidation?.isValid &&
        isAvailable &&
        usernameInput.toLowerCase() !== user?.username?.toLowerCase() &&
        !loading;

    const getInitials = (name?: string) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Account Information
                    </CardTitle>
                    <CardDescription>
                        View and manage your account details
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user?.photoURL} alt={user?.displayName || 'User'} />
                            <AvatarFallback className="text-lg">
                                {getInitials(user?.displayName)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{user?.displayName || 'User'}</p>
                            <p className="text-sm text-muted-foreground">Profile Picture</p>
                        </div>
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                        <Label htmlFor="username" className="flex items-center gap-2">
                            <AtSign className="h-4 w-4" />
                            Username
                        </Label>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Input
                                    id="username"
                                    value={usernameInput}
                                    onChange={(e) => setUsernameInput(e.target.value)}
                                    placeholder="Enter username"
                                    className={
                                        usernameValidation && !usernameValidation.isValid
                                            ? 'border-destructive'
                                            : usernameValidation?.isValid && isAvailable
                                                ? 'border-green-500'
                                                : ''
                                    }
                                />
                                {checkingAvailability && (
                                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                                )}
                                {!checkingAvailability && usernameValidation?.isValid && isAvailable !== null && (
                                    <div className="absolute right-3 top-3">
                                        {isAvailable ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <X className="h-4 w-4 text-destructive" />
                                        )}
                                    </div>
                                )}
                            </div>
                            <Button
                                onClick={handleSaveUsername}
                                disabled={!canSave}
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                            </Button>
                        </div>
                        {usernameValidation && !usernameValidation.isValid && (
                            <p className="text-xs text-destructive">{usernameValidation.error}</p>
                        )}
                        {usernameValidation?.isValid && isAvailable === false && (
                            <p className="text-xs text-destructive">Username is already taken</p>
                        )}
                        {usernameValidation?.isValid && isAvailable === true && usernameInput !== user?.username && (
                            <p className="text-xs text-green-600">Username is available!</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            Your public profile will be accessible at /{usernameInput || 'username'}
                        </p>
                    </div>

                    {/* Display Name */}
                    <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                            id="displayName"
                            value={user?.displayName || ''}
                            disabled
                            className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">
                            Display name is managed through your authentication provider
                        </p>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">
                            Your email address cannot be changed
                        </p>
                    </div>

                    {/* User ID */}
                    <div className="space-y-2">
                        <Label htmlFor="userId">User ID</Label>
                        <Input
                            id="userId"
                            value={user?.id || ''}
                            disabled
                            className="bg-muted font-mono text-xs"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

