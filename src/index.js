import moment from 'moment';
import client from '~/api/apolloClient';
import { createPullRequestQuery } from '~/api/queries';
import { extractCommentAndReview } from '~/counter/index';
import User from '~/model/User';
import { oneWeekBefore, createCountTable } from '~/utility/index';
import sendToSlack from '~/utility/slack';

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
  const dateFomrat = 'YYYY/MM/DD';
  const text = `
\`\`\`
${process.env.GITHUB_ORGANIZATION}/${process.env.GITHUB_REPOSITORY}

${oneWeekBefore.format(dateFomrat)} ~ ${moment().format(dateFomrat)}
${countTableString}
\`\`\`
`;
  await sendToSlack(text);
};

main();
