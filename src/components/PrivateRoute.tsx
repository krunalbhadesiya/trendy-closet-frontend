import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Function to get role from localStorage
const getRoleFromLocalStorage = () => {
  const role = localStorage.getItem('role');
  return role as 'admin' | 'user' | null; // Type assertion for role
};

interface PrivateRouteProps {
  children: JSX.Element;
  adminRoute?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminRoute }) => {
  const token = localStorage.getItem('token');
  const role = getRoleFromLocalStorage();
  const location = useLocation();

  // If the route is an admin route and the user is not an admin or doesn't have a token
  if (adminRoute) {
    if (!token || role !== 'admin') {
      return <Navigate to="/auth" replace state={{ from: location }} />;
    }
  } else {
    // If it's a user route and there is no token
    if (!token) {
      return <Navigate to="/auth" replace state={{ from: location }} />;
    }
  }

  return children;
};

export default PrivateRoute;
