export class Journal {
  private _name: string | null = null;
  private _pages: string | null = null;
  private _volume: number | null = null;
  private _data: any;

  constructor(data: any) {
    this._data = data;
    this._initAttributes(data);
  }

  toString(): string {
    return `${this._name}`;
  }

  // TypeScript does not have an exact equivalent to Python's __repr__,
  // but toString serves a similar purpose.

  getItem(key: string): any {
    return (this._data as any)[key] as any;
  }

  keys(): string[] {
    return Object.keys(this._data);
  }

  get name(): string | null {
    return this._name;
  }

  get pages(): string | null {
    return this._pages;
  }

  get volume(): number | null {
    return this._volume;
  }

  get rawData(): object {
    return this._data;
  }

  private _initAttributes(data: any): void {
    if ('name' in data) {
      this._name = data['name'] as any;
    }
    if ('pages' in data) {
      this._pages = data['pages'] as any;
    }
    if ('volume' in data) {
      this._volume = data['volume'] as any;
    }
  }
}
