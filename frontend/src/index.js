import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ContextRegisterProvider } from "./backendcontexts/registercontext.js"
import {TextContextProvider } from "./backendcontexts/textContexts"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <TextContextProvider>
    <ContextRegisterProvider>
     
         <App />
      {/* </ContextTextProvider> */}
      
    </ContextRegisterProvider>
    </TextContextProvider>
  </React.StrictMode>
);

