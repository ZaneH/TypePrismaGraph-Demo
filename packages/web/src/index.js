import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import OnboardingPage from './components/OnboardingPage'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const cache = new InMemoryCache()
const link = new HttpLink({ uri: 'http://localhost:4000' })

// used for graphql calls
const apolloClient = new ApolloClient({
  link,
  cache,
})

// used for routing
const routing = (
  <ApolloProvider client={apolloClient}>
    <Router>
      <div>
        <Route exact path="/app" component={App} />
        <Route exact path="/" component={OnboardingPage} />
        <Route exact path="/chat" render={(props) => <App sidebar={1} />} />
      </div>
    </Router>
  </ApolloProvider>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
