import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';

import { client } from './lib/apollo';
import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { TransactionsProvider } from './hooks/useTransactions';
import { ApolloProvider } from '@apollo/client';

import 'react-toastify/dist/ReactToastify.css';
import { Toast } from './components/Toast';

Modal.setAppElement('#root');

export function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <TransactionsProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </TransactionsProvider>
      </ApolloProvider>
      <GlobalStyle />
      <Toast
        autoClose={2000}
        pauseOnHover={false}
        draggable
        closeOnClick={false}
        position="bottom-left"
      />
    </>
  );
}
