import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import QuoteWizard from './pages/QuoteWizard'
import Step1InsuranceType from './pages/Step1InsuranceType'
import Step2Details from './pages/Step2Details'
import Step3Quote from './pages/Step3Quote'
import Success from './pages/Success'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/quote',
    element: <QuoteWizard />,
    children: [
      {
        index: true,
        element: <Navigate to="/quote/type" replace />,
      },
      {
        path: 'type',
        element: <Step1InsuranceType />,
      },
      {
        path: 'details',
        element: <Step2Details />,
      },
      {
        path: 'summary',
        element: <Step3Quote />,
      },
    ],
  },
  {
    path: '/success',
    element: <Success />,
  },
])
