import { ApiRequester } from './ApiRequester';
import { Author } from './Author';
import { BaseReference } from './BaseReference';
import { Citation } from './Citation';
import { PaginatedResults } from './PaginatedResults';
import { Paper } from './Paper';
import { Reference } from './Reference';

type Fields = string[];

export class SemanticScholar {
  static DEFAULT_API_URL = 'https://api.semanticscholar.org';
  static DEFAULT_PARTNER_API_URL = 'https://partner.semanticscholar.org';
  static BASE_PATH_GRAPH = '/graph/v1';
  static BASE_PATH_RECOMMENDATIONS = '/recommendations/v1';

  private authHeader: { 'x-api-key'?: string } = {};
  private _timeout: number;
  private _requester: ApiRequester;
  public api_url: string;

  constructor(
    timeout: number = 30000,
    api_key: string | null = null,
    api_url: string | null = null
  ) {
    this.api_url = api_url ? api_url : SemanticScholar.DEFAULT_API_URL;

    if (api_key) {
      this.authHeader = { 'x-api-key': api_key };
      if (!api_url) {
        this.api_url = SemanticScholar.DEFAULT_PARTNER_API_URL;
      }
    }

    this._timeout = timeout;
    this._requester = new ApiRequester({ timeout: this._timeout });
  }

  get timeout(): number {
    return this._timeout;
  }

  set timeout(timeout: number) {
    this._timeout = timeout;
    this._requester.timeout = timeout;
  }

  async get_paper(
    paper_id: string,
    fields: Fields | null = null
  ): Promise<Paper> {
    fields = fields || Paper.FIELDS;

    const base_url = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${base_url}/paper/${paper_id}`;
    const parameters = `&fields=${fields.join(',')}`;
    console.log(url);

    const data = await this._requester.getData(
      url,
      parameters,
      this.authHeader
    );
    const paper = new Paper(data);

    return paper;
  }

  async get_papers(
    paper_ids: string[],
    fields: Fields | null = null
  ): Promise<Paper[]> {
    fields = fields || Paper.SEARCH_FIELDS;

    const base_url = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${base_url}/paper/batch`;
    const parameters = `&fields=${fields.join(',')}`;

    const payload = { ids: paper_ids };

    const data = await this._requester.getData(
      url,
      parameters,
      this.authHeader,
      payload
    );
    const papers = data.map((item: any) => new Paper(item));

    return papers;
  }

  getPaperAuthors(
    paperId: string,
    fields?: string[],
    limit: number = 1000
  ): PaginatedResults<Author> {
    if (limit < 1 || limit > 1000) {
      throw new Error(
        'The limit parameter must be between 1 and 1000 inclusive.'
      );
    }

    if (!fields) {
      fields = Author.SEARCH_FIELDS.filter(
        (item) => !item.startsWith('papers')
      );
    }

    const fieldStr = fields.join(',');

    const baseUrl = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${baseUrl}/paper/${paperId}/authors`;

    const results = new PaginatedResults(
      this._requester,
      Author,
      url,
      undefined,
      fieldStr,
      limit
    );

    return results;
  }

  getPaperCitations(
    paperId: string,
    fields?: string[],
    limit: number = 1000
  ): PaginatedResults<Citation> {
    if (limit < 1 || limit > 1000) {
      throw new Error(
        'The limit parameter must be between 1 and 1000 inclusive.'
      );
    }

    if (!fields) {
      fields = [...BaseReference.FIELDS, ...Paper.SEARCH_FIELDS];
    }

    const fieldStr = fields.join(',');

    const baseUrl = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${baseUrl}/paper/${paperId}/citations`;

    const results = new PaginatedResults(
      this._requester,
      Citation,
      url,
      undefined,
      fieldStr,
      limit
    );

    return results;
  }

  getPaperReferences(
    paperId: string,
    fields?: string[],
    limit: number = 1000
  ): PaginatedResults<Reference> {
    if (limit < 1 || limit > 1000) {
      throw new Error(
        'The limit parameter must be between 1 and 1000 inclusive.'
      );
    }

    if (!fields) {
      fields = [...BaseReference.FIELDS, ...Paper.SEARCH_FIELDS];
    }

    const fieldStr = fields.join(',');

    const baseUrl = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${baseUrl}/paper/${paperId}/references`;

    const results = new PaginatedResults(
      this._requester,
      Reference,
      url,
      undefined,
      fieldStr,
      limit
    );

    return results;
  }

  async search_paper(
    query: string,
    year?: string,
    publication_types?: string[],
    open_access_pdf?: boolean,
    venue?: string[],
    fields_of_study?: string[],
    fields?: Fields,
    limit: number = 100
  ): Promise<PaginatedResults<Paper>> {
    if (limit < 1 || limit > 100) {
      throw new Error(
        'The limit parameter must be between 1 and 100 inclusive.'
      );
    }

    fields = fields || Paper.SEARCH_FIELDS;

    const base_url = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${base_url}/paper/search`;

    query += year ? `&year=${year}` : '';

    if (publication_types) {
      const publication_types_str = publication_types.join(',');
      query += `&publicationTypes=${publication_types_str}`;
    }

    if (open_access_pdf) {
      query += '&openAccessPdf';
    }

    if (venue) {
      const venue_str = venue.join(',');
      query += `&venue=${venue_str}`;
    }

    if (fields_of_study) {
      const fields_of_study_str = fields_of_study.join(',');
      query += `&fieldsOfStudy=${fields_of_study_str}`;
    }

    const paginatedResults = await new PaginatedResults(
      this._requester,
      Paper,
      url,
      query,
      fields.join(','),
      limit,
      this.authHeader
    );

    return paginatedResults;
  }

  // Add these methods to the SemanticScholar class definition

  async get_author(
    author_id: string,
    fields: Fields | null = null
  ): Promise<Author> {
    fields = fields || Author.FIELDS;

    const base_url = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${base_url}/author/${author_id}`;
    const parameters = `&fields=${fields.join(',')}`;

    const data = await this._requester.getData(
      url,
      parameters,
      this.authHeader
    );
    const author = new Author(data as any);

    return author;
  }

  async get_authors(
    author_ids: string[],
    fields: Fields | null = null
  ): Promise<Author[]> {
    fields = fields || Author.SEARCH_FIELDS;

    const base_url = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${base_url}/author/batch`;
    const parameters = `&fields=${fields.join(',')}`;

    const payload = { ids: author_ids };

    const data = await this._requester.getData(
      url,
      parameters,
      this.authHeader,
      payload
    );
    const authors = data.map((item: any) => new Author(item));

    return authors;
  }

  // Add this to your existing SemanticScholar class
  async get_author_papers(
    author_id: string,
    fields: Fields | null = null,
    limit: number = 1000
  ): Promise<PaginatedResults<Paper>> {
    if (limit < 1 || limit > 1000) {
      throw new Error(
        'The limit parameter must be between 1 and 1000 inclusive.'
      );
    }

    fields = fields || Paper.SEARCH_FIELDS;

    const base_url = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${base_url}/author/${author_id}/papers`;

    const results = new PaginatedResults(
      this._requester,
      Paper,
      url,
      undefined,
      fields.join(','),
      limit
    );

    return results;
  }

  async search_author(
    query: string,
    fields: Fields | null = null,
    limit: number = 1000
  ): Promise<PaginatedResults<Author>> {
    if (limit < 1 || limit > 1000) {
      throw new Error(
        'The limit parameter must be between 1 and 1000 inclusive.'
      );
    }

    fields = fields || Author.SEARCH_FIELDS;

    const base_url = `${this.api_url}${SemanticScholar.BASE_PATH_GRAPH}`;
    const url = `${base_url}/author/search`;

    const results = new PaginatedResults(
      this._requester,
      Author,
      url,
      query,
      fields.join(','),
      limit,
      this.authHeader
    );

    return results;
  }

  async get_recommended_papers(
    paper_id: string,
    fields: Fields | null = null,
    limit: number = 100,
    pool_from: 'recent' | 'all-cs' = 'recent'
  ): Promise<Paper[]> {
    if (['recent', 'all-cs'].indexOf(pool_from) === -1) {
      throw new Error(
        'The pool_from parameter must be either "recent" or "all-cs".'
      );
    }

    if (limit < 1 || limit > 500) {
      throw new Error(
        'The limit parameter must be between 1 and 500 inclusive.'
      );
    }

    fields = fields || Paper.SEARCH_FIELDS;

    const base_url = `${this.api_url}${SemanticScholar.BASE_PATH_RECOMMENDATIONS}`;
    const url = `${base_url}/papers/forpaper/${paper_id}`;

    const parameters = `&fields=${fields.join(
      ','
    )}&limit=${limit}&from=${pool_from}`;

    const data = await this._requester.getData(
      url,
      parameters,
      this.authHeader
    );
    const papers = (data as any).recommendedPapers.map(
      (item: any) => new Paper(item)
    );

    return papers;
  }

  async get_recommended_papers_from_lists(
    positive_paper_ids: string[],
    negative_paper_ids: string[] | null = null,
    fields: Fields | null = null,
    limit: number = 100
  ): Promise<Paper[]> {
    if (limit < 1 || limit > 500) {
      throw new Error(
        'The limit parameter must be between 1 and 500 inclusive.'
      );
    }

    fields = fields || Paper.SEARCH_FIELDS;

    const base_url = `${this.api_url}${SemanticScholar.BASE_PATH_RECOMMENDATIONS}`;
    const url = `${base_url}/papers/`;

    const parameters = `&fields=${fields.join(',')}&limit=${limit}`;

    const payload = {
      positivePaperIds: positive_paper_ids,
      negativePaperIds: negative_paper_ids,
    };

    const data = await this._requester.getData(
      url,
      parameters,
      this.authHeader,
      payload
    );
    const papers = (data as any).recommendedPapers.map(
      (item: any) => new Paper(item)
    );

    return papers;
  }
}
