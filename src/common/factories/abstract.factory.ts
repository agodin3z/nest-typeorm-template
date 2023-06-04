/**
 * Abstract class for create entities factories.
 * @abstract
 * @typeParam T - Type of entity object
 * @example
 * ```
 * export class MyFactory extends AbstractFactory<Entity> {}
 * ```
 */
export abstract class AbstractFactory<T> {
  /**
   * Generates a new entity object.
   * @abstract
   * @param {unknown} input - Input to be passed to the generated objects
   * @returns {Promise<T>}
   * @example
   * ```ts
   * make(input: EntityInput = {}): Promise<EntityDto[]> {
   *   const repo = await getManager().getRepository<Entity>(Entity);
   *   const entity = new Entity();
   *   entity.id = input.id ?? faker.datatype.number(99);
   *   const saveObject = await repo.save(entity);
   *   return plainToInstance(EntityDto, saveObject);
   * }
   * ```
   */
  abstract make(input?: unknown): Promise<T>;
  /**
   * Generates many entity objects.
   * @abstract
   * @param {number} factorial - Quantity of objects to be generated
   * @param {unknown} input - Input to be passed to the generated objects
   * @returns {Promise<T[]>}
   * @example
   * ```ts
   * makeMany(factorial = 1, input: EntityInput = {}): Promise<EntityDto[]> {
   *   return Promise.all([...Array(factorial)].map(() => this.make(input)));
   * }
   * ```
   */
  abstract makeMany(factorial: number, input: unknown): Promise<T[]>;
}
