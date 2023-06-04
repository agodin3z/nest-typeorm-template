import { IsDate, IsOptional } from 'class-validator';
import { DeleteDateColumn } from 'typeorm';

import { AuditedEntity } from './audited.entity';

/**
 * Base class for all paranoid entities.
 * Add the following field to your entity:
 * @param {Date} deletedAt - Date of deletion.
 * @example
 * ```
 * export class MyEntity extends ParanoidEntity {}
 * ```
 */
export abstract class ParanoidEntity extends AuditedEntity {
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  @IsDate()
  @IsOptional()
  deletedAt?: Date;
}
