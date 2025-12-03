import React, { useEffect, useState } from 'react';
import { ChatRoom } from '@/features/chat/domain/ChatRoom';
import { GetChatRooms } from '@/features/chat/application/GetChatRooms';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useAuth } from '@/features/auth/presentation/useAuth';
import { FirebaseChatRepository } from '@/features/chat/infrastructure/FirebaseChatRepository';
import { formatDistanceToNow } from 'date-fns';

interface ChatRoomListProps {
    onChatSelected: (chatRoomId: string) => void;
    activeChatRoomId?: string;
    refreshTrigger?: number; // To trigger refresh when new chat is created
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({ onChatSelected, activeChatRoomId, refreshTrigger }) => {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [loading, setLoading] = useState(false);
    const { user: currentUser } = useAuth();

    const chatRepository = new FirebaseChatRepository();
    const getChatRooms = new GetChatRooms(chatRepository);

    useEffect(() => {
        const fetchChatRooms = async () => {
            if (!currentUser) return;
            setLoading(true);
            try {
                const rooms = await getChatRooms.execute(currentUser.id);
                setChatRooms(rooms);
            } catch (error) {
                console.error("Failed to fetch chat rooms", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChatRooms();
    }, [currentUser, refreshTrigger]);

    const getOtherParticipant = (room: ChatRoom) => {
        if (!currentUser || !room.participantDetails) return null;
        return room.participantDetails.find(u => u.id !== currentUser.id) || room.participantDetails[0];
    };

    return (
        <Card className="h-full border-r-0 rounded-r-none flex flex-col gap-0 py-0">
            <CardHeader className="flex-shrink-0 border-b py-4">
                <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0 min-h-0">
                {loading ? (
                    <div className="p-4 text-center">Loading chats...</div>
                ) : chatRooms.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No conversations yet.</div>
                ) : (
                    <div className="flex flex-col">
                        {chatRooms.map(room => {
                            const otherUser = getOtherParticipant(room);
                            return (
                                <Button
                                    key={room.id}
                                    variant={activeChatRoomId === room.id ? "secondary" : "ghost"}
                                    className="justify-start h-auto py-4 px-4 rounded-none border-b"
                                    onClick={() => onChatSelected(room.id)}
                                >
                                    <Avatar className="h-12 w-12 mr-3">
                                        <AvatarImage src={otherUser?.photoURL || ''} alt={otherUser?.displayName || 'User'} />
                                        <AvatarFallback>{otherUser?.displayName?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start w-full overflow-hidden">
                                        <div className="flex justify-between w-full">
                                            <span className="font-medium truncate">{otherUser?.displayName || 'Unknown User'}</span>
                                            {room.lastMessage && (
                                                <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                                                    {formatDistanceToNow(room.lastMessage.createdAt, { addSuffix: true })}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm text-muted-foreground truncate w-full text-left">
                                            {room.lastMessage ? room.lastMessage.content : 'No messages yet'}
                                        </span>
                                    </div>
                                </Button>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
