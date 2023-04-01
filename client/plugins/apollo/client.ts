import { ApolloClient, InMemoryCache, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import json from './possibleTypes.json'

const cache = new InMemoryCache()

function getProductionBranchUrl () {
  if (import.meta.env.VITE_APP_BRANCH === 'dev') {
    return 'https://bausicht-dev.herokuapp.com/graphql'
  } else if (import.meta.env.VITE_APP_BRANCH === 'staging') {
    return 'https://bausicht-staging.herokuapp.com/graphql'
  } else {
    return 'https://bausicht.herokuapp.com/graphql'
  }
}

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
  link: from([errorLink, retryLink, authLink.concat(uploadLink)])
})
