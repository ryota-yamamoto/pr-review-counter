import client from '~/api/apolloClient';
import { createPullRequestQuery } from '~/api/queries';
import { createCountMap, extractCommentAndReview } from '~/counter/index';
import { createCountTable } from '~/utility/table';
import { sendToSlack, addInfo } from '~/utility/slack';

const main = async () => {
  const query = createPullRequestQuery();
  const { data } = await client.query({
    query,
  });

  const prEdges = data.repository.pullRequests.edges;
  const commentAndReviewEdges = extractCommentAndReview(prEdges);

  const countMap = createCountMap(commentAndReviewEdges);
  const countTableString = createCountTable(countMap);
  const text = addInfo(countTableString);
  await sendToSlack(text);
};

main();
