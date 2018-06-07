import User from '~/model/User';
import { isLastOneWeek } from '~/utility/time';

export const commentAndReviewFilter = (itemAuthor, prAuthor, createdAt) =>
  itemAuthor.__typename !== 'Bot' &&
  itemAuthor.login !== prAuthor.login &&
  isLastOneWeek(createdAt);

export const extractCommentAndReview = prEedges =>
  prEedges.reduce((acc, { node: prNode }) => {
    const edges = [...prNode.comments.edges, ...prNode.reviews.edges];
    const commentAndReviews = edges.filter(({ node }) =>
      commentAndReviewFilter(node.author, prNode.author, node.createdAt),
    );

    // eslint-disable-next-line no-param-reassign
    acc = [...acc, ...commentAndReviews];
    return acc;
  }, []);

export const createCountMap = commentAndReviewEdges =>
  commentAndReviewEdges.reduce((countMapAcc, { node: { author } }) => {
    const user = countMapAcc[author.login] || new User(author.login);
    user.increment();
    countMapAcc[author.login] = user;
    return countMapAcc;
  }, {});

export const hoge = '';
