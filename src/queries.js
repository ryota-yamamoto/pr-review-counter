import gql from 'graphql-tag'

export const getPullRequest = after => gql`
  {
    repository(owner: "RettyInc", name: "retty_design") {
      pullRequests(
        first: 100
        orderBy: { field: UPDATED_AT, direction: DESC }
        after: ${after}
      ) {
        edges {
          node {
            id
            updatedAt
            comments(first: 100) {
              edges {
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
