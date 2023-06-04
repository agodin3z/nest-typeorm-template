import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { EncryptionService } from '../../common/services/encryption.service';
import { User } from './entities/user.entity';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  private readonly encryption: EncryptionService = new EncryptionService();
  /**
   * Indicates that this subscriber only listen to User events.
   */
  listenTo(): any {
    return User;
  }

  beforeInsert(event: InsertEvent<User>): void {
    // HASHING THE PASSWORD BEFORE INSERTED
    const oldPasswd = event.entity.password;
    event.entity.password = this.encryption.hashPassword(oldPasswd);
  }

  beforeUpdate(event: UpdateEvent<User>): void | Promise<any> {
    // HASHING THE PASSWORD BEFORE UPDATE IF EXISTS
    const oldPasswd = event.entity?.password;
    if (oldPasswd) {
      event.entity.password = this.encryption.hashPassword(oldPasswd);
    }
  }
}
