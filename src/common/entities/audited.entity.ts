import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, UpdateDateColumn } from 'typeorm';

import { CreatedEntity } from './created.entity';

/**
 * Base class for audited entities.
 * Add the following fields to your entity:
 * @param {string} createdBy - Creator ID
 * @param {Date} updatedAt - Date of last update
 * @param {string} updatedBy - ID of last updater
 * @example
 * ```
 * export class MyEntity extends AuditedEntity {}
 * ```
 */
export abstract class AuditedEntity extends CreatedEntity {
  @Column({ update: false })
  @IsString()
  @IsNotEmpty()
  createdBy!: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    insert: false,
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @Column({ nullable: true, insert: false })
  @IsString()
  @IsOptional()
  updatedBy?: string;
}
