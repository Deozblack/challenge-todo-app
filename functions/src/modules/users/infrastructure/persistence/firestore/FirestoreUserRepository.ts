import { db } from '../../../../../shared/infrastructure/database/firebase.config.js';
import type { UserRepository } from '../../../domain/User.repository.js';
import { User } from '../../../domain/User.entity.js';
import { UserCreatedAt } from '../../../domain/value-objects/UserCreatedAt.js';
import { UserEmail } from '../../../domain/value-objects/UserEmail.js';
import { UserId } from '../../../domain/value-objects/UserId.js';
import { UserName } from '../../../domain/value-objects/UserName.js';
import { UserPassword } from '../../../domain/value-objects/UserPassword.js';
import { UserUpdatedAt } from '../../../domain/value-objects/UserUpdatedAt.js';
import { Timestamp } from 'firebase-admin/firestore';

interface FirestoreUserDocument {
  id: string;
  name: string;
  email: string;
  password: string;
  published_at: Timestamp;
  updated_at: Timestamp;
}

export class FirestoreUserRepository implements UserRepository {
  private usersCollection = db.collection('users');

  async findById(id: UserId): Promise<User | null> {
    const userDoc = await this.usersCollection.doc(id.value).get();
    if (!userDoc.exists) return null;
    const data = userDoc.data() as FirestoreUserDocument;
    return this.toUserEntity(data);
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const userQuery = await this.usersCollection
      .where('email', '==', email.value)
      .get();
    if (userQuery.empty) return null;
    const data = userQuery.docs[0]!.data() as FirestoreUserDocument;
    return this.toUserEntity(data);
  }

  async findAll(): Promise<User[]> {
    const usersSnapshot = await this.usersCollection.get();
    const data = usersSnapshot.docs.map(
      (doc) => doc.data() as FirestoreUserDocument
    );
    return data.map((doc) => this.toUserEntity(doc));
  }

  async create(user: User): Promise<void> {
    const data = this.toFirestoreDocument(user);
    await this.usersCollection.doc(user.id.value).set(data);
  }

  async update(user: User): Promise<void> {
    const data = this.toFirestoreDocument(user);
    const { id, ...updateData } = data;
    await this.usersCollection.doc(id).update(updateData);
  }

  async delete(id: UserId): Promise<void> {
    await this.usersCollection.doc(id.value).delete();
  }

  private toFirestoreDocument(user: User): FirestoreUserDocument {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
      published_at: Timestamp.fromDate(user.createdAt.value),
      updated_at: Timestamp.fromDate(user.updatedAt.value),
    };
  }

  private toUserEntity(doc: FirestoreUserDocument): User {
    return new User(
      new UserId(doc.id),
      new UserName(doc.name),
      new UserEmail(doc.email),
      new UserPassword(doc.password),
      new UserCreatedAt(doc.published_at.toDate()),
      new UserUpdatedAt(doc.updated_at.toDate())
    );
  }
}
