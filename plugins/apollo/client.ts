import { ApolloClient, InMemoryCache, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry'

import { HttpLink } from '@apollo/client'

const cache = new InMemoryCache()

const retryLink = new RetryLink({
  delay: {
    initial: 800,
    max: 30000,
    jitter: true
  },
  attempts: {
    max: 20,
    retryIf: (error) => !!error
  }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('userToken')
  const viewerId = localStorage.getItem('viewerId')
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : viewerId ? `${viewerId}` : ''
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql'
})

export default new ApolloClient({
  cache,
  link: from([retryLink, authLink, httpLink])
})
