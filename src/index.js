import gql from 'graphql-tag'
import client from '~/apolloClient'

const query = gql`
  query {
    viewer {
      login
    }
  }
`

client
  .query({
    query,
  })
  .then(res => {
    // eslint-disable-next-line
    console.log(res)
  })
  .catch(error => {
    // eslint-disable-next-line
    console.log(error)
  })
