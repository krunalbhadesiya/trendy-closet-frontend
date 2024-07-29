import React from 'react';
import Header from './Header';
import AuthHeader from './AuthHeader';
import UserHeader from './UserHeader';

const Header1 = () => {
    return <Header />;
};

const Header2 = () => {
    return <AuthHeader />;
};

const Header3 = () => {
    return <UserHeader />;
};

const HeaderSwitcher: React.FC = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        return <Header1 />;
    }

    if (role === 'admin') {
        return <Header2 />;
    }

    if (token || !role) {
        return <Header3 />;
    }

    return <Header />;
};

export default HeaderSwitcher;
