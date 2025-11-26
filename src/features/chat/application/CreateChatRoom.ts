import { ChatRepository } from '../domain/ChatRepository';

export class CreateChatRoom {
    constructor(private chatRepository: ChatRepository) { }

    async execute(participants: string[]): Promise<string> {
        if (!participants || participants.length < 2) {
            throw new Error('At least two participants are required');
        }
        return this.chatRepository.createChatRoom(participants);
    }
}
