import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client/core'
import { ApolloProvider } from '@apollo/client/react'
import { AuthProvider } from './context/AuthContext'

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token || '',
    }
  }));
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
  </StrictMode>,
)
