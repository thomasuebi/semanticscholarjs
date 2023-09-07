import { Paper } from './Paper';

export class BaseReference {
  _contexts: any[] | null = null;
  _intents: any[] | null = null;
  _isInfluential: boolean | null = null;
  _paper: Paper | null = null;
  declare _data: any;

  static FIELDS = ['contexts', 'intents', 'isInfluential'];

  constructor(data: any) {
    this._data = data;
    this._initAttributes(data);
  }

  get contexts(): any[] | null {
    return this._contexts;
  }

  get intents(): any[] | null {
    return this._intents;
  }

  get isInfluential(): boolean | null {
    return this._isInfluential;
  }

  get paper(): Paper | null {
    return this._paper;
  }

  private _initAttributes(data: any): void {
    if ('contexts' in data) {
      this._contexts = data['contexts'] as any;
    }
    if ('intents' in data) {
      this._intents = data['intents'] as any;
    }
    if ('isInfluential' in data) {
      this._isInfluential = data['isInfluential'] as any;
    }
  }
}
