import client from '~/apolloClient'
import { getPullRequest } from '~/queries'
import { displayCountMap } from '~/utility'

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

      comments.forEach(({ node: { author: { login } } }) => {
        const count = countMap[login] !== undefined ? countMap[login] : 0
        countMap[login] = count + 1
      })

      reviews.forEach(({ node: { author: { login } } }) => {
        const count = countMap[login] !== undefined ? countMap[login] : 0
        countMap[login] = count + 1
      })
    })
    displayCountMap(countMap)
  } catch (error) {
    console.error(error)
  }
}

main()
