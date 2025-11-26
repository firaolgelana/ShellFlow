import { User } from '@/features/auth/domain/User';
import { Message } from './Message';

export interface ChatRoom {
    id: string;
    participants: string[]; // User IDs
    lastMessage?: Message;
    createdAt: Date;
    updatedAt: Date;
    participantDetails?: User[]; // Optional, for display purposes
}
