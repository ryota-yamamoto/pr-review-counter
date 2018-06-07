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

export const hoge = '';
