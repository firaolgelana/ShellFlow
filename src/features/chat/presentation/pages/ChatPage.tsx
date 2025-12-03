import React, { useState } from 'react';
import { UserList } from '../components/UserList';
import { ChatRoomList } from '../components/ChatRoomList';
import { ChatWindow } from '../components/ChatWindow';

export const ChatPage: React.FC = () => {
    const [selectedChatRoomId, setSelectedChatRoomId] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleChatCreated = (chatRoomId: string) => {
        setSelectedChatRoomId(chatRoomId);
        setRefreshTrigger(prev => prev + 1); // Refresh list to show new chat
    };

    const handleChatSelected = (chatRoomId: string) => {
        setSelectedChatRoomId(chatRoomId);
    };
    return (
        <div className="container mx-auto p-4 h-[calc(100vh-5rem)]">
            <div className="grid grid-cols-12 h-full gap-4 min-h-0">

                {/* User list */}
                <div className="col-span-3 h-full min-h-0">
                    <UserList onChatCreated={handleChatCreated} />
                </div>

                {/* Chat room list */}
                <div className="col-span-3 h-full min-h-0">
                    <ChatRoomList
                        onChatSelected={handleChatSelected}
                        activeChatRoomId={selectedChatRoomId || undefined}
                        refreshTrigger={refreshTrigger}
                    />
                </div>

                {/* Chat window */}
                <div className="col-span-6 h-full min-h-0">
                    {selectedChatRoomId ? (
                        <ChatWindow chatRoomId={selectedChatRoomId} />
                    ) : (
                        <div className="h-full flex items-center justify-center border rounded-lg bg-muted/10 text-muted-foreground">
                            Select a user or chat to start messaging
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
