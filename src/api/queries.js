import gql from 'graphql-tag'

export const getPullRequest = (
  prAfter = null,
  commentAfter = null,
  reviewAfter = null,
) => gql`
  {
    repository(
      owner: ${process.env.GITHUB_ORGANIZATION},
      name: ${process.env.GITHUB_REPOSITORY}
    ) {
      pullRequests(
        first: 100
        orderBy: { field: UPDATED_AT, direction: DESC }
        after: ${prAfter}
      ) {
        edges {
          cursor
          node {
            updatedAt
            author {
              login
            }
            comments(first: 2, after: ${commentAfter}) {
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
            reviews(first: 2, after: ${reviewAfter}) {
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
`

export const GET = ''