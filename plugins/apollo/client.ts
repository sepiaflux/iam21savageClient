import { ApolloClient, InMemoryCache, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry'
import { HttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

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
  const token = localStorage.getItem('userToken')
  const viewerId = useViewerId()
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : viewerId.value ? `${viewerId.value}` : ''
    }
  }
})

const httpLink = new HttpLink({
  uri: import.meta.env.PROD
    ? 'https://iam21backend.herokuapp.com/graphql'
    : 'http://localhost:5000/graphql'

})

const wsLink = new GraphQLWsLink(createClient({
  url: import.meta.env.PROD
    ? 'ws://iam21backend.herokuapp.com/graphql'
    : 'ws://localhost:5000/graphql'
}))

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export default new ApolloClient({
  cache,
  link: from([retryLink, authLink, splitLink])
})
