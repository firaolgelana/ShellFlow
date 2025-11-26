import { ChatRepository } from '../domain/ChatRepository';
import { User } from '@/features/auth/domain/User';

export class GetAllUsers {
    constructor(private chatRepository: ChatRepository) { }

    async execute(): Promise<User[]> {
        return this.chatRepository.getAllUsers();
    }
}
