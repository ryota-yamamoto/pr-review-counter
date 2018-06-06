import gql from 'graphql-tag';

export const createPullRequestQuery = (after = null) => gql`
  {
    repository(
      owner: ${process.env.GITHUB_ORGANIZATION},
      name: ${process.env.GITHUB_REPOSITORY}
    ) {
      pullRequests(
        first: 100
        orderBy: { field: UPDATED_AT, direction: DESC }
        after: ${after}
      ) {
        edges {
          cursor
          node {
            updatedAt
            author {
              login
            }
            comments(first: 100) {
              edges {
                cursor
                node {
                  author {
                    login
                  }
                  url
                  createdAt
                }
              }
            }
            reviews(first: 100) {
              edges {
                cursor
                node {
                  author {
                    login
                  }
                  url
                  createdAt
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const createCommentsQuery = (after = null) => gql`
  {
    pullRequest(number: 1929) {
      id
      comments(first: 100: after: ${after}) {
        edges {
          cursor
          node {
            author {
              login
            }
            url
            createdAt
          }
        }
      }
    }
  }
`;
