import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import OnboardingPage from './components/Onboarding/OnboardingPage'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const cache = new InMemoryCache()
const link = new HttpLink({ uri: 'http://localhost:4000' })

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user/token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// used for graphql calls
const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache,
})

// used for routing
const routing = (
  <ApolloProvider client={apolloClient}>
    <Router>
      <Route exact path="/app" component={App} />
      <Route exact path="/" component={OnboardingPage} />
      <Route exact path="/app/feed" render={(props) => <App sidebar={0} />} />
      <Route exact path="/app/chat" render={(props) => <App sidebar={1} />} />
      <Route exact path="/app/people" render={(props) => <App sidebar={2} />} />
      <Route exact path="/app/settings" render={(props) => <App sidebar={3} />} />
    </Router>
  </ApolloProvider>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
