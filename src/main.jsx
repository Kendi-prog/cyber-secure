import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { Provider } from 'react-redux';
import { persistor, store } from '../../src/store/store';
import { stripePromise } from '../../src/utils/stripe/stripe.utils';


import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App /> 
          </Elements>    
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)








