import client from '~/apolloClient'
import User from '~/User'
import { getPullRequest } from '~/queries'
import { displayCountMap, isLastOneWeek, range } from '~/utility'

const main = async () => {
  const countMap = {}
  let lastComentCursor = null // eslint-disable-line
  let lastReviewCursor = null // eslint-disable-line

  range(2).forEach(async i => {
    const query = getPullRequest(null, lastComentCursor, lastReviewCursor)
    console.log(i) // eslint-disable-line
    try {
      const {
        data: {
          repository: { pullRequests },
        },
      } = await client.query({
        query,
      })

      pullRequests.edges.forEach(({ node: pr }) => {
        const prAuthorLogin = pr.author.login
        const commentsAndReviews = [...pr.comments.edges, ...pr.reviews.edges]

        commentsAndReviews.forEach(
          ({
            cursor,
            node: {
              __typename,
              createdAt,
              url,
              author: { login },
            },
          }) => {
            console.log(cursor); // eslint-disable-line
            if (__typename === 'PullRequestReview') {
              lastReviewCursor = cursor
            } else if (__typename === 'IssueComment') {
              lastComentCursor = cursor
            }

            if (!isLastOneWeek(createdAt) || prAuthorLogin === login) {
              return
            }

            const user = countMap[login] || new User(login)
            user.increment()
            user.urls.push(url)
            countMap[login] = user
          },
        )
      })
      displayCountMap(countMap, true)
    } catch (error) {
      console.error(error)
    }
  })
}

main()
