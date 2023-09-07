export class SemanticScholarException extends Error {
  constructor(...args: any[]) {
    super(...args);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = SemanticScholarException.name; // stack traces display correctly now
  }
}

export class BadQueryParametersException extends SemanticScholarException {
  constructor(...args: any[]) {
    super(...args);
    this.name = BadQueryParametersException.name;
  }
}

export class ObjectNotFoundException extends SemanticScholarException {
  constructor(...args: any[]) {
    super(...args);
    this.name = ObjectNotFoundException.name;
  }
}
