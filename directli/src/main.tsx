import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import Feed from './features/inspireFeed/Feed.tsx'
import RequestContainer from './features/request/RequestContainer.tsx'
import store from './store/index';
import Layout from './Layout.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: < Feed />,
  },
  {
    path: '/request',
    element: <RequestContainer />
  }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <Provider store={store}>
      <Layout>
        <RouterProvider router={router} />
      </Layout >
    </Provider >
  </React.StrictMode >
)