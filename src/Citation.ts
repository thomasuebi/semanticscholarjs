import { BaseReference } from './BaseReference';
import { Paper } from './Paper';

export class Citation extends BaseReference {
  constructor(data: any) {
    super(data);
    if ('citingPaper' in data) {
      this._paper = new Paper(data['citingPaper'] as any);
    }
  }
}
