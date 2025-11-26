import { ChatRepository } from '../domain/ChatRepository';

export class SendMessage {
    constructor(private chatRepository: ChatRepository) { }

    async execute(chatRoomId: string, senderId: string, content: string): Promise<void> {
        if (!content.trim()) {
            throw new Error('Message content cannot be empty');
        }
        return this.chatRepository.sendMessage(chatRoomId, senderId, content);
    }
}
