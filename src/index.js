import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import fetch from 'node-fetch';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    fetch,
  }),
  cache: new InMemoryCache()
});


// const query = gql`
// query {
//   repository(name: retty_design, owner: RettyInc) {
//     nameWithOwner

//     pullRequests(last: 100) { # 実際は日時で絞る
//       edges {
//         node {
//           title
//           url
//           reviews(last: 100) { # 実際はすべて取る
//             edges {
//               node {
//                 comments(first: 10) { # 実際はすべて取る
//                   edges {
//                     node {
//                       databaseId # idでcountの辞書つくる
//                       url
//                       author{ login }
//                       bodyText
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }`

// client.query({
//   query
// }).then(res => {
//   console.log(res); // eslint-disable-line
// }).catch(error => {
//   console.log(error); // eslint-disable-line;
// })
