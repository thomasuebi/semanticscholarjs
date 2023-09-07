import type { Author } from './';
import { Journal } from './';
import { Tldr } from './';
import { PublicationVenue } from './';

export class Paper {
  private _abstract?: string;
  private _authors?: Author[];
  private _citationCount?: number;
  private _citations?: Paper[];
  private _corpusId?: string;
  private _embedding?: object;
  private _externalIds?: object;
  private _fieldsOfStudy?: string[];
  private _influentialCitationCount?: number;
  private _isOpenAccess?: boolean;
  private _journal?: Journal;
  private _openAccessPdf?: object;
  private _paperId?: string;
  private _publicationDate?: Date;
  private _publicationTypes?: string[];
  private _publicationVenue?: PublicationVenue;
  private _referenceCount?: number;
  private _references?: Paper[];
  private _s2FieldsOfStudy?: string[];
  private _title?: string;
  private _tldr?: Tldr;
  private _url?: string;
  private _venue?: string;
  private _year?: number;

  constructor(data: any) {
    this._initAttributes(data);
  }

  private _initAttributes(data: any): void {
    this._abstract = data.abstract;
    this._authors = data.authors;
    this._citationCount = data.citationCount;
    this._citations = data.citations?.map((item: any) => new Paper(item));
    this._corpusId = data.corpusId;
    this._embedding = data.embedding;
    this._externalIds = data.externalIds;
    this._fieldsOfStudy = data.fieldsOfStudy;
    this._influentialCitationCount = data.influentialCitationCount;
    this._isOpenAccess = data.isOpenAccess;
    this._journal = data.journal ? new Journal(data.journal) : undefined;
    this._openAccessPdf = data.openAccessPdf;
    this._paperId = data.paperId;
    this._publicationDate = data.publicationDate
      ? new Date(data.publicationDate)
      : undefined;
    this._publicationTypes = data.publicationTypes;
    this._publicationVenue = data.publicationVenue
      ? new PublicationVenue(data.publicationVenue)
      : undefined;
    this._referenceCount = data.referenceCount;
    this._references = data.references;
    this._s2FieldsOfStudy = data.s2FieldsOfStudy;
    this._title = data.title;
    this._tldr = data.tldr ? new Tldr(data.tldr) : undefined;
    this._url = data.url;
    this._venue = data.venue;
    this._year = data.year;
  }

  static FIELDS = [
    'abstract',
    'authors',
    'authors.affiliations',
    'authors.aliases',
    'authors.authorId',
    'authors.citationCount',
    'authors.externalIds',
    'authors.hIndex',
    'authors.homepage',
    'authors.name',
    'authors.paperCount',
    'authors.url',
    'citationCount',
    'citations',
    'citations.abstract',
    'citations.authors',
    'citations.citationCount',
    'citations.corpusId',
    'citations.externalIds',
    'citations.fieldsOfStudy',
    'citations.influentialCitationCount',
    'citations.isOpenAccess',
    'citations.journal',
    'citations.openAccessPdf',
    'citations.paperId',
    'citations.publicationDate',
    'citations.publicationTypes',
    'citations.publicationVenue',
    'citations.referenceCount',
    'citations.s2FieldsOfStudy',
    'citations.title',
    'citations.url',
    'citations.venue',
    'citations.year',
    'corpusId',
    'embedding',
    'externalIds',
    'fieldsOfStudy',
    'influentialCitationCount',
    'isOpenAccess',
    'journal',
    'openAccessPdf',
    'paperId',
    'publicationDate',
    'publicationTypes',
    'publicationVenue',
    'referenceCount',
    'references',
    'references.abstract',
    'references.authors',
    'references.citationCount',
    'references.citationStyles',
    'references.corpusId',
    'references.externalIds',
    'references.fieldsOfStudy',
    'references.influentialCitationCount',
    'references.isOpenAccess',
    'references.journal',
    'references.openAccessPdf',
    'references.paperId',
    'references.publicationDate',
    'references.publicationTypes',
    'references.publicationVenue',
    'references.referenceCount',
    'references.s2FieldsOfStudy',
    'references.title',
    'references.url',
    'references.venue',
    'references.year',
    's2FieldsOfStudy',
    'title',
    'tldr',
    'url',
    'venue',
    'year',
  ];

  static SEARCH_FIELDS = [
    'abstract',
    'authors',
    'citationCount',
    'corpusId',
    'externalIds',
    'fieldsOfStudy',
    'influentialCitationCount',
    'isOpenAccess',
    'journal',
    'openAccessPdf',
    'paperId',
    'publicationDate',
    'publicationTypes',
    'publicationVenue',
    'referenceCount',
    's2FieldsOfStudy',
    'title',
    'url',
    'venue',
    'year',
  ];

  get abstract(): string | undefined {
    return this._abstract;
  }

  get authors(): Author[] | undefined {
    return this._authors;
  }

  get citationCount(): number | undefined {
    return this._citationCount;
  }

  get citations(): Paper[] | undefined {
    return this._citations;
  }

  get corpusId(): string | undefined {
    return this._corpusId;
  }

  get embedding(): object | undefined {
    return this._embedding;
  }

  get externalIds(): object | undefined {
    return this._externalIds;
  }

  get fieldsOfStudy(): string[] | undefined {
    return this._fieldsOfStudy;
  }

  get influentialCitationCount(): number | undefined {
    return this._influentialCitationCount;
  }

  get isOpenAccess(): boolean | undefined {
    return this._isOpenAccess;
  }

  get journal(): Journal | undefined {
    return this._journal;
  }

  get openAccessPdf(): object | undefined {
    return this._openAccessPdf;
  }

  get paperId(): string | undefined {
    return this._paperId;
  }

  get publicationDate(): Date | undefined {
    return this._publicationDate;
  }

  get publicationTypes(): string[] | undefined {
    return this._publicationTypes;
  }

  get publicationVenue(): PublicationVenue | undefined {
    return this._publicationVenue;
  }

  get referenceCount(): number | undefined {
    return this._referenceCount;
  }

  get references(): Paper[] | undefined {
    return this._references;
  }

  get s2FieldsOfStudy(): string[] | undefined {
    return this._s2FieldsOfStudy;
  }

  get title(): string | undefined {
    return this._title;
  }

  get tldr(): Tldr | undefined {
    return this._tldr;
  }

  get url(): string | undefined {
    return this._url;
  }

  get venue(): string | undefined {
    return this._venue;
  }

  get year(): number | undefined {
    return this._year;
  }
}
