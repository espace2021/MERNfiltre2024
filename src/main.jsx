import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import "@fortawesome/fontawesome-free/css/all.css";

import { GoogleOAuthProvider } from '@react-oauth/google';

import store from './redux/store';
import { Provider } from 'react-redux' ;

import { AiAssistantProvider } from "@sista/ai-assistant-react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="373746469631-olabkld8gdusgn26jagt0tmjql4v4h0r.apps.googleusercontent.com">
  <React.StrictMode>
      <Provider store={store}>
      <AiAssistantProvider apiKey="pk-sista-a52d90d5-7bba-4d6f-b44f-f13258f8de53">
        <App />
      </AiAssistantProvider>
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
)
