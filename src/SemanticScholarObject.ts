export class SemanticScholarObject {
  _data: any | null;

  constructor() {
    this._data = null;
  }

  toString(): string {
    return this._data ? this._data.toString() : '';
  }

  // Replacing Python's __repr__ with a TypeScript equivalent
  repr(): any {
    return this._data ? JSON.stringify(this._data) : '';
  }

  // Replacing Python's __getitem__ with a TypeScript equivalent
  getItem(key: string): any {
    return this._data ? this._data[key] : undefined;
  }

  keys(): string[] | undefined {
    return this._data ? Object.keys(this._data) : undefined;
  }

  get raw_data(): any {
    return this._data;
  }
}
