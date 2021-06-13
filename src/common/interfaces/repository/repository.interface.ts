export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create(payload: Omit<T, 'id'>): Promise<T>;
  update(id: string, payload: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}

