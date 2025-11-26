import { ChatRepository } from '../domain/ChatRepository';
import { Message } from '../domain/Message';

export class GetMessages {
    constructor(private chatRepository: ChatRepository) { }

    async execute(chatRoomId: string): Promise<Message[]> {
        return this.chatRepository.getMessages(chatRoomId);
    }

    subscribe(chatRoomId: string, callback: (messages: Message[]) => void): () => void {
        return this.chatRepository.subscribeToMessages(chatRoomId, callback);
    }
}
