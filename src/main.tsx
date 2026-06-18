import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import LandingPage from './pages/LandingPage'

import AuthLayout from './components/layout/AuthLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgetPassword'
import ResetPassword from './pages/Auth/ResetPassword'

import DashboardHome from './pages/Dashboard/DashboardHome'
import Profile from './pages/Dashboard/Profile'
import BookingHistory from './pages/Dashboard/BookingHistory'
import WalletHistory from './pages/Dashboard/WalletHistory'
import KYC from './pages/Dashboard/KYC'
import BankDetails from './pages/Dashboard/BankDetails'
import ReferralHistory from './pages/Dashboard/ReferralHistory'

import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './store/store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />
      }
    ]
  },
  {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
        {
            index: true,
            element: <DashboardHome />
        },
        {
            path: "profile",
            element: <Profile />
        },
        {
            path: "bookings",
            element: <BookingHistory />
        },
        {
            path: "wallet",
            element: <WalletHistory />
        },
        {
            path: "kyc",
            element: <KYC />
        },
        {
            path: "banks",
            element: <BankDetails />
        },
        {
            path: "refer",
            element: <ReferralHistory />
        }
    ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster position="top-right" />
  </StrictMode>,
)
