// Import the SemanticScholar library
import { SemanticScholar } from '../index';

const main = async () => {
  // Initialize the SemanticScholar client
  const sch = new SemanticScholar();

  // const paper = await sch.get_paper('10.1093/mind/lix.236.433');
  // console.log(paper.title);

  // const author = await sch.get_author('2262347');
  // console.log(author.name);

  const results = await (
    await sch.search_paper('Computing Machinery and Intelligence')
  ).nextPage();
  console.log(results[5].title);
};

main();
