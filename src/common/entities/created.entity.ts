import { IsDate, IsOptional } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

/**
 * Base class for entities.
 * Add the following field to your entity:
 * @param {Date} createdAt - Date of creation.
 * @example
 * ```
 * export class MyEntity extends CreatedEntity {}
 * ```
 */
export abstract class CreatedEntity {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  @IsDate()
  @IsOptional()
  createdAt: Date;
}
