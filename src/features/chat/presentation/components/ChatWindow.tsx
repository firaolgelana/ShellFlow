import React, { useEffect, useState, useRef } from 'react';
import { Message } from '@/features/chat/domain/Message';
import { GetMessages } from '@/features/chat/application/GetMessages';
import { SendMessage } from '@/features/chat/application/SendMessage';
import { FirebaseChatRepository } from '@/features/chat/infrastructure/FirebaseChatRepository';
import { useAuth } from '@/features/auth/presentation/useAuth';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/shared/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Send } from 'lucide-react';
import { format } from 'date-fns';

interface ChatWindowProps {
    chatRoomId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatRoomId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const { user: currentUser } = useAuth();
    const scrollRef = useRef<HTMLDivElement>(null);

    const chatRepository = new FirebaseChatRepository();
    const getMessages = new GetMessages(chatRepository);
    const sendMessage = new SendMessage(chatRepository);

    useEffect(() => {
        const unsubscribe = getMessages.subscribe(chatRoomId, (msgs) => {
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, [chatRoomId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;

        try {
            await sendMessage.execute(chatRoomId, currentUser.id, newMessage);
            setNewMessage('');
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <Card className="h-full flex flex-col rounded-l-none border-l-0">
            <CardHeader className="border-b py-4">
                <CardTitle className="text-base">Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg) => {
                            const isMe = msg.senderId === currentUser?.id;
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-lg px-4 py-2 ${isMe
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                            }`}
                                    >
                                        <p className="text-sm">{msg.content}</p>
                                        <span className="text-[10px] opacity-70 block text-right mt-1">
                                            {format(msg.createdAt, 'HH:mm')}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
};
