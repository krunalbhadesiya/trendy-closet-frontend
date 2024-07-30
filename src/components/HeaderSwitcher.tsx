// src/HeaderSwitcher.tsx
import React from 'react';
import Header from './Header';
import AuthHeader from './AuthHeader';
import UserHeader from './UserHeader';
import { useAuth } from '../hooks/useAuth';

const HeaderSwitcher: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated && role === 'admin') {
    return <AuthHeader />;
  }

  if (isAuthenticated) {
    return <UserHeader />;
  }

  return <Header />;
};

export default HeaderSwitcher;
