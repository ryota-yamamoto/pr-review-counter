import client from '~/apolloClient'
import Count from '~/Count'
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

      comments.forEach(({ node: { createdAt, url, author: { login } } }) => {
        if (!isLastOneWeek(createdAt) || prAuthorLogin === login) {
          return
        }

        const count =
          countMap[login] !== undefined ? countMap[login] : new Count(login)
        count.increment()
        count.urls.push(url)
        countMap[login] = count
      })

      reviews.forEach(({ node: { createdAt, url, author: { login } } }) => {
        if (!isLastOneWeek(createdAt) || prAuthorLogin === login) {
          return
        }

        const count =
          countMap[login] !== undefined ? countMap[login] : new Count(login)
        count.increment()
        count.urls.push(url)
        countMap[login] = count
      })
    })
    displayCountMap(countMap)
  } catch (error) {
    console.error(error)
  }
}

main()
