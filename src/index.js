import gql from 'graphql-tag'
import client from '~/apolloClient'

const query = gql`
  query {
    viewer {
      login
    }
  }
`

const main = async () => {
  try {
    const res = await client.query({
      query,
    })
    // eslint-disable-next-line
    console.log(res)
  } catch (error) {
    console.error(error)
  }
}

main()
