import client from '~/apolloClient'
import User from '~/User'
import { getPullRequest } from '~/queries'
import { displayCountMap, isLastOneWeek } from '~/utility'

const query = getPullRequest(null)

const main = async () => {
  const countMap = {}

  try {
    const {
      data: {
        repository: { pullRequests },
      },
    } = await client.query({
      query,
    })

    pullRequests.edges.forEach(({ node: pr }) => {
      const comments = pr.comments.edges
      const reviews = pr.reviews.edges
      const prAuthorLogin = pr.author.login

      const commentsAndReviews = [...comments, ...reviews]

      commentsAndReviews.forEach(
        ({
          node: {
            createdAt,
            url,
            author: { login },
          },
        }) => {
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
    displayCountMap(countMap)
  } catch (error) {
    console.error(error)
  }
}

main()
