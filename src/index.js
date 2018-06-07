import client from '~/api/apolloClient';
import User from '~/model/User';
import { createPullRequestQuery } from '~/api/queries';
import { extractCommentAndReview } from '~/counter/index';
import { createCountTable } from '~/utility/table';
import { sendToSlack, addInfo } from '~/utility/slack';

const main = async () => {
  const query = createPullRequestQuery(null, null, null);
  const { data } = await client.query({
    query,
  });

  const prEdges = data.repository.pullRequests.edges;
  const commentAndReviewEdges = extractCommentAndReview(prEdges);

  const countMap = commentAndReviewEdges.reduce(
    (countMapAcc, { cursor, node: { author } }) => {  // eslint-disable-line
      const user = countMapAcc[author.login] || new User(author.login);
      user.increment();
      countMapAcc[author.login] = user;
      return countMapAcc;
    },
    {},
  );

  const countTableString = createCountTable(countMap);
  const text = addInfo(countTableString);
  await sendToSlack(text);
};

main();
