// Import the SemanticScholarObject class

export class PublicationVenue {
  private _alternate_names: string[] | null;
  private _alternate_urls: string[] | null;
  private _id: string | null;
  private _issn: string | null;
  private _name: string | null;
  private _type: string | null;
  private _url: string | null;

  constructor(data: any) {
    this._alternate_names = null;
    this._alternate_urls = null;
    this._id = null;
    this._issn = null;
    this._name = null;
    this._type = null;
    this._url = null;
    this._init_attributes(data);
  }

  get alternate_names(): string[] | null {
    return this._alternate_names;
  }

  get alternate_urls(): string[] | null {
    return this._alternate_urls;
  }

  get id(): string | null {
    return this._id;
  }

  get issn(): string | null {
    return this._issn;
  }

  get name(): string | null {
    return this._name;
  }

  get type(): string | null {
    return this._type;
  }

  get url(): string | null {
    return this._url;
  }

  private _init_attributes(data: any): void {
    this._alternate_names = data.alternate_names || null;
    this._alternate_urls = data.alternate_urls || null;
    this._id = data.id || null;
    this._issn = data.issn || null;
    this._name = data.name || null;
    this._type = data.type || null;
    this._url = data.url || null;
  }
}
