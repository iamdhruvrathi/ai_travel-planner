import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/Header';
import { Toaster } from './components/ui/sonner';
import ViewTrip from './view-trip/[tripId]';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>
);
