import type { User } from './User.entity.js';
import type { UserEmail } from './value-objects/UserEmail.js';
import type { UserId } from './value-objects/UserId.js';

export interface UserRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
