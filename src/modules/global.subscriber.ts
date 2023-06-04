import { Logger } from '@nestjs/common';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class GlobalSubscriber implements EntitySubscriberInterface {
  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<any>): void {
    Logger.verbose(`AFTER ENTITY INSERTED: `, event.entity);
  }

  /**
   * Called after entity update.
   */
  afterUpdate(event: UpdateEvent<any>): void {
    Logger.verbose(`AFTER ENTITY UPDATED: `, event.entity);
  }

  /**
   * Called after entity removal.
   */
  afterRemove(event: RemoveEvent<any>): void {
    Logger.verbose(
      `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity,
    );
  }

  /**
   * Called after entity removal.
   */
  afterSoftRemove(event: SoftRemoveEvent<any>): void {
    Logger.verbose(
      `AFTER ENTITY WITH ID ${event.entityId} SOFT REMOVED: `,
      event.entity,
    );
  }

  /**
   * Called after entity recovery.
   */
  afterRecover(event: RecoverEvent<any>): void {
    Logger.verbose(
      `AFTER ENTITY WITH ID ${event.entityId} RECOVERED: `,
      event.entity,
    );
  }
}
