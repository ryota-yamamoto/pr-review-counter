import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost'
import fetch from 'node-fetch'

const authLink = (operation, forward) => {
  const token = process.env.GITHUB_API_TOKEN

  operation.setContext(context => ({
    ...context,
    headers: {
      ...context.headers,
      authorization: `Bearer ${token}`,
    },
  }))

  return forward(operation)
}

const link = ApolloLink.from([
  authLink,
  new HttpLink({
    uri: 'https://api.github.com/graphql',
    fetch,
  }),
])

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
