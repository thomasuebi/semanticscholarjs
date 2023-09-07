import { ApiRequester } from './ApiRequester';

type ApiResponse = {
  data: any[];
  total?: number;
  offset: number;
  next?: number;
};

export class PaginatedResults<T> {
  private requester: ApiRequester;
  private dataType: new (data: any) => T;
  private url: string;
  private query: string | null;
  private fields: string | null;
  private limit: number | null;
  private headers: Record<string, string> | null;

  private data: any[] = [];
  private total: number = 0;
  private offset: number;
  private next: number = 0;
  private parameters: string = '';
  private items: T[] = [];

  constructor(
    requester: ApiRequester,
    dataType: new (data: any) => T,
    url: string,
    query?: string,
    fields?: string,
    limit?: number,
    headers?: any
  ) {
    this.requester = requester;
    this.dataType = dataType;
    this.url = url;
    this.query = query || null;
    this.fields = fields || null;
    this.limit = limit || null;
    this.headers = headers || null;
    this.offset = 0 - (this.limit ?? 0);

    this.getNextPage();
  }

  get Total(): number {
    return this.total;
  }

  get Offset(): number {
    return this.offset;
  }

  get Next(): number {
    return this.next;
  }

  get Items(): T[] {
    return this.items;
  }

  get RawData(): any[] {
    return this.data;
  }

  [Symbol.iterator](): IterableIterator<T> {
    let index = 0;
    const that = this;

    return {
      next(): IteratorResult<T> {
        if (index < that.items.length) {
          return { value: that.items[index++], done: false };
        } else if (that.hasNextPage()) {
          that.getNextPage();
          return { value: that.items[index++], done: false };
        } else {
          return { done: true, value: null };
        }
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  private hasNextPage(): boolean {
    const hasMoreResults = this.offset + (this.limit ?? 0) === this.next;
    const underLimit = this.offset + (this.limit ?? 0) < 9999;
    return hasMoreResults && underLimit;
  }

  private async getNextPage(): Promise<T[]> {
    this.buildParams();

    const results = (await this.requester.getData(
      this.url,
      this.parameters,
      this.headers ?? {}
    )) as ApiResponse; // <-- type assertion here

    this.data = results.data;
    this.total = results.total ?? 0;
    this.offset = results.offset;
    this.next = results.next ?? 0;

    const resultItems: T[] = results.data.map(
      (item: any) => new this.dataType(item)
    );

    this.items = [...this.items, ...resultItems];

    return resultItems;
  }

  private buildParams(): void {
    this.parameters = this.query ? `query=${this.query}` : '';

    if (this.fields) {
      this.parameters += `&fields=${this.fields}`;
    }

    const offset = this.offset + (this.limit ?? 0);
    this.parameters += `&offset=${offset}`;

    const total = offset + (this.limit ?? 0);
    if (total === 10000) {
      this.limit = (this.limit ?? 0) - 1;
    }
    this.parameters += `&limit=${this.limit}`;
  }

  public nextPage(): void {
    this.getNextPage();
  }
}
