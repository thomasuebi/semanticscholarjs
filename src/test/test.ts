// Import the SemanticScholar library
import { SemanticScholar } from '../index';

const main = async () => {
  // Initialize the SemanticScholar client
  const sch = new SemanticScholar();
  console.log('Initialized SemanticScholar client');

  // Define an asynchronous function to get the paper
  const getPaperInfo = async () => {
    console.log('Inside getPaperInfo function');
    try {
      // Fetch paper details by its identifier
      console.log('Fetching paper');
      const paper = await sch.get_paper('10.1093/mind/lix.236.433');
      console.log('Paper fetched');

      // Log the paper's title to the console
      console.log('Paper title:', paper.title);
    } catch (error) {
      // Handle any errors
      console.error('An error occurred:', error);
    }
  };

  // Invoke the function
  await getPaperInfo();
};

main();
