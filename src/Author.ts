export class Author {
  private _affiliations: any[] | null = null;
  private _aliases: any[] | null = null;
  private _authorId: string | null = null;
  private _citationCount: number | null = null;
  private _externalIds: Record<string, unknown> | null = null;
  private _hIndex: number | null = null;
  private _homepage: string | null = null;
  private _name: string | null = null;
  private _paperCount: number | null = null;
  private _papers: any[] | null = null;
  private _url: string | null = null;

  static FIELDS = [
    'affiliations',
    'aliases',
    'authorId',
    'citationCount',
    'externalIds',
    'hIndex',
    'homepage',
    'name',
    'paperCount',
    'papers',
    'papers.abstract',
    'papers.authors',
    'papers.citationCount',
    'papers.corpusId',
    'papers.externalIds',
    'papers.fieldsOfStudy',
    'papers.influentialCitationCount',
    'papers.isOpenAccess',
    'papers.journal',
    'papers.openAccessPdf',
    'papers.paperId',
    'papers.publicationDate',
    'papers.publicationTypes',
    'papers.publicationVenue',
    'papers.referenceCount',
    'papers.s2FieldsOfStudy',
    'papers.title',
    'papers.url',
    'papers.venue',
    'papers.year',
    'url',
  ];

  static SEARCH_FIELDS = Author.FIELDS;

  constructor(data: Record<string, unknown>) {
    this._init_attributes(data);
  }

  private _init_attributes(data: any): void {
    this._affiliations = data.affiliations as any[] | null;
    this._aliases = data.aliases as any[] | null;
    this._authorId = data.authorId as string | null;
    this._citationCount = data.citationCount as number | null;
    this._externalIds = data.externalIds as Record<string, unknown> | null;
    this._hIndex = data.hIndex as number | null;
    this._homepage = data.homepage as string | null;
    this._name = data.name as string | null;
    this._paperCount = data.paperCount as number | null;
    if (data.papers) {
      this._papers = data.papers;
    }
    this._url = data.url as string | null;
  }

  get affiliations(): any[] | null {
    return this._affiliations;
  }

  get aliases(): any[] | null {
    return this._aliases;
  }

  get authorId(): string | null {
    return this._authorId;
  }

  get citationCount(): number | null {
    return this._citationCount;
  }

  get externalIds(): Record<string, unknown> | null {
    return this._externalIds;
  }

  get hIndex(): number | null {
    return this._hIndex;
  }

  get homepage(): string | null {
    return this._homepage;
  }

  get name(): string | null {
    return this._name;
  }

  get paperCount(): number | null {
    return this._paperCount;
  }

  get papers(): any[] | null {
    return this._papers;
  }

  get url(): string | null {
    return this._url;
  }
}
