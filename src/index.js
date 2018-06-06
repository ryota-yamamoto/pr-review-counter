import client from '~/api/apolloClient';
import { createPullRequestQuery } from '~/api/queries';
import { extractCommentAndReview } from '~/counter/index';
import User from '~/model/User';
import { displayCountMap } from '~/utility/index';

const main = async () => {
  const query = createPullRequestQuery(null, null, null);
  const { data } = await client.query({
    query,
  });

  const prEdges = data.repository.pullRequests.edges;
  const commentAndReviewEdges = extractCommentAndReview(prEdges);

  const countMap = commentAndReviewEdges.reduce(
    (countMapAcc, { cursor, node: { author } }) => {
      console.log(cursor); // eslint-disable-line
      const user = countMapAcc[author.login] || new User(author.login);
      user.increment();
      countMapAcc[author.login] = user;
      return countMapAcc;
    },
    {},
  );

  displayCountMap(countMap);

  // console.log(reviews); // eslint-disable-line
  // const countMap = {}
  // let lastComentCursor = null // eslint-disable-line
  // let lastReviewCursor = null // eslint-disable-line

  // range(2).forEach(async i => {
  //   const query = getPullRequest(null, lastComentCursor, lastReviewCursor)
  //   console.log(i) // eslint-disable-line
  //   try {
  //     const {
  //       data: {
  //         repository: { pullRequests },
  //       },
  //     } = await client.query({
  //       query,
  //     })

  //     pullRequests.edges.forEach(({ node: pr }) => {
  //       const prAuthorLogin = pr.author.login
  //       const commentsAndReviews = [...pr.comments.edges, ..
  // .pr.reviews.edges]

  //       commentsAndReviews.forEach(
  //         ({
  //           cursor,
  //           node: {
  //             __typename,
  //             createdAt,
  //             url,
  //             author: { login },
  //           },
  //         }) => {
  //           console.log(cursor); // eslint-disable-line
  //           if (__typename === 'PullRequestReview') {
  //             lastReviewCursor = cursor
  //           } else if (__typename === 'IssueComment') {
  //             lastComentCursor = cursor
  //           }

  //           if (!isLastOneWeek(createdAt) || prAuthorLogin === login) {
  //             return
  //           }

  //           const user = countMap[login] || new User(login)
  //           user.increment()
  //           user.urls.push(url)
  //           countMap[login] = user
  //         },
  //       )
  //     })
  //     displayCountMap(countMap, true)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // })
};

main();
