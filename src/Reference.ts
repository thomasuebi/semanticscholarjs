import { BaseReference } from './BaseReference';
import { Paper } from './Paper';

export class Reference extends BaseReference {
  declare _paper: Paper | null;

  constructor(data: any) {
    super(data);
    this._paper = null;
    if ('citedPaper' in data) {
      this._paper = new Paper(data.citedPaper);
    }
  }

  get paper(): Paper | null {
    return this._paper;
  }
}
