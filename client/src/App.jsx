import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentOutlet from './pages/student/StudentOutlet';
import MainDashboardStudent from './pages/student/MainDashBoardStudent';
import AboutPage from './pages/AboutPage';
import FeedPage from './pages/student/FeedPage';
import UserProfile from './pages/student/UserProfile';
import FeedbackForm from './pages/student/FeedbackForm';
import StaffRatings from './pages/student/StaffRatings';
import AdminOutlet from './pages/admin/AdminOutlet'
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ViewFeedbackPage from './pages/admin/ViewFeedbackPage';
import AddStaffPage from './pages/admin/AddStaffPage';
import HomeOutlet from './pages/HomeOutlet';
import ErrorPage from './pages/ErrorPage';
import ReviewStaff from './pages/admin/ReviewStaff';
import EditStaffPage from './pages/admin/EditStaffPage';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import StarRatingsReview from './pages/admin/StarRatingsReview';
import AdminLogin from './pages/AdminLoginPage';
import AddFeaturePage from './pages/admin/AddFeaturePage';
import NetworkAwareComponent from './pages/network/NetworkAwareComponent';
import ITSupportContact from './pages/ITSupportContact';
import { NetworkStatusProvider } from './pages/network/NetworkStatusProvider';

// importing actions 
import { action as loginAction } from './pages/LoginPage';
import { action as adminLoginAction } from './pages/AdminLoginPage';
import { action as registerAction } from './pages/RegisterPage';
// importing loaders 
import { loader as userProfileLoader } from './pages/student/UserProfile';
import { loader as stdDashboardLoader } from './pages/student/MainDashBoardStudent';
import { loader as adminLoader } from './pages/admin/AdminDashboardPage'

// Define the router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeOutlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,

      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: 'login-admin',
        element: <AdminLogin />,
        action: adminLoginAction
      },

      {
        path: 'register',
        element: <RegisterPage />,
        action: registerAction
      },
      {
        path: '/redirect/forget-password',
        element: <ForgetPassword />,
      },
      {
        path: '/redirect/reset-password/:token',
        element: <ResetPassword />,

      },

    ]
  },
  {
    path: 'student-dashboard',
    element: <StudentOutlet />,
    children: [
      {
        index: true,
        element: <MainDashboardStudent />,
        loader: stdDashboardLoader
      },
      {
        path: 'about',
        element: <AboutPage />,
        loader: stdDashboardLoader
      },
      {
        path: 'feeds',
        element: <FeedPage />,
        // loader: feedLoader
      },
      {
        path: 'user-profile',
        element: <UserProfile />,
        loader: userProfileLoader
      },
      {
        path: 'share-feedback',
        element: <FeedbackForm />,
        loader: stdDashboardLoader
      },
      {
        path: 'rate-faculties',
        element: <StaffRatings />,
        loader: stdDashboardLoader
      },


    ]
  },
  {
    path: 'admin-dashboard',
    element: <AdminOutlet />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
        loader: adminLoader
      },
      {
        path: 'view-feeds',
        element: <ViewFeedbackPage />,
        loader: adminLoader
      },
      {
        path: 'add-staff',
        element: <AddStaffPage />,
        loader: adminLoader
      },
      {
        path: 'review-staff',
        element: <ReviewStaff />,
        loader: adminLoader
      },
      {
        path: 'review-staff/:id',
        element: <EditStaffPage />,
        loader: adminLoader
      },
      {
        path: 'star-ratings',
        element: <StarRatingsReview />,
        loader: adminLoader
      },
      {
        path: 'add-feature',
        element: <AddFeaturePage />,
        loader: adminLoader
      },
      {
        path: 'support',
        element: <ITSupportContact />,
      },
    ]
  }
]);


const App = () => {
  useEffect(() => {
    function checkCookieAccess() {
      try {
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
      } catch (error) {
        if (error instanceof DOMException && (error.code === 18 || error.name === 'SecurityError')) {
          showCookieAlert();
        }
      }
    }

    function showCookieAlert() {
      const alertDiv = document.createElement('div');
      alertDiv.innerHTML = `
     <div style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 400px; background: #ff6b6b; color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 15px 20px; text-align: center; z-index: 9999; font-family: 'Arial', sans-serif;">
    <p style="margin: 0; font-size: 16px; line-height: 1.4;">
        🍪 This site requires cookies to function correctly. Please enable cookies in your browser settings.
    </p>
    <button style="margin-top: 10px; background: white; color: #ff6b6b; border: none; padding: 8px 15px; border-radius: 5px; font-size: 14px; cursor: pointer; transition: background 0.3s ease;"
        onclick="this.parentElement.style.display='none'">
        Got it!
    </button>
</div>

      `;
      document.body.appendChild(alertDiv);
    }

    checkCookieAccess();
  }, []);

  return (
    <NetworkStatusProvider>
      <NetworkAwareComponent>
        <RouterProvider router={router} />
      </NetworkAwareComponent>
    </NetworkStatusProvider>
  );
};

export default App;
