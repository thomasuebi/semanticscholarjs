export class Tldr {
  private _model: string | null;
  private _text: string | null;
  private _data: any;

  constructor(data: any) {
    this._model = null;
    this._text = null;
    this._data = data;
    this._init_attributes(data);
  }

  toString(): string {
    return this._text ? this._text : '';
  }

  // Replacing Python's __repr__ with TypeScript's toString
  repr(): string {
    return this.toString();
  }

  // Replacing Python's __getitem__ with TypeScript equivalent
  getItem(key: string): any {
    return this._data ? this._data[key] : undefined;
  }

  keys(): string[] | undefined {
    return this._data ? Object.keys(this._data) : undefined;
  }

  get model(): string | null {
    return this._model;
  }

  get text(): string | null {
    return this._text;
  }

  get raw_data(): any {
    return this._data;
  }

  private _init_attributes(data: any): void {
    this._model = data.model || null;
    this._text = data.text || null;
  }
}
