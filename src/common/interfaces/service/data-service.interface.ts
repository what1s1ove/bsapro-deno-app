interface IDataService<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create(payload: Partial<T>): Promise<T>;
  update(payload: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export type { IDataService };
