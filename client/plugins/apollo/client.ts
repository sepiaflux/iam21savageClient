import { ApolloClient, InMemoryCache, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry'

const cache = new InMemoryCache()

const retryLink = new RetryLink({
  delay: {
    initial: 800,
    max: 30000,
    jitter: true
  },
  attempts: {
    max: 20,
    retryIf: error => !!error
  }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const deprecatedToken = localStorage.getItem('magpieToken')
  let token = localStorage.getItem('bausichtToken')
  if (!token && deprecatedToken) {
    token = deprecatedToken
    localStorage.setItem('bausichtToken', deprecatedToken)
  }
  const siteId = localStorage.getItem('siteId')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
      siteId: siteId ? `${siteId}` : ''
    }
  }
})

export default new ApolloClient({
  cache,
  link: from([retryLink, authLink])
})
