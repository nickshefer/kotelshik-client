import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Layout } from './components/layout/Layout';
import { App } from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Layout>
      <ColorModeScript />
      <App />
    </Layout>
  </StrictMode>
);
