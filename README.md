# semanticscholarjs

Unofficial JavaScript/TypeScript client library for [Semantic Scholar APIs](https://api.semanticscholar.org/), currently supporting the Academic Graph API and Recommendations API.

This library is strongly inspired by [danielnsilva/semanticscholar](https://github.com/danielnsilva/semanticscholar), a Python implementation by Daniel Silva.

## Installation

```
npm i semanticscholarjs
```

## Usage

```ts
// Import the SemanticScholar library
import { SemanticScholar } from 'semanticscholarjs';

const sch = new SemanticScholar();
```

### Paper Lookup

```ts
const paper = await sch.get_paper('10.1093/mind/lix.236.433');
console.log('Paper title:', paper.title);
```

```
Computing Machinery and Intelligence
```

### Author Lookup

```ts
const author = await sch.get_author('2262347');
console.log(author.name);
```

```
A. Turing
```

The library also supports the following features:

- get_paper (single paper)
- get_papers (multiple papers at once)
- getPaperAuthors
- getPaperCitations
- getPaperReferences
- search_paper (search by query)
- get_author
- get_authors
- get_author_papers
- search_author (search by query)
- get_recommended_papers
- get_recommended_papers_from_lists
