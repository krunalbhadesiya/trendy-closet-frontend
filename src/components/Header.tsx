// src/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoBlack from '../assets/Logo-Black.png';
import { Button } from './ui/button';
import {
  Category,
  Shop,
  Box,
  Book,
  Sms,
  HambergerMenu,
  Home,
  Call,
  Building
} from 'iconsax-react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

import UserDialogButton from './UserDialogButton';
import { useAuth } from '../hooks/useAuth';

interface NavItemProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActivePath?: boolean;
}

const Header: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const [, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine which navigation items to display based on auth status and role
  let navItems: React.ReactNode[] = [];
  let bgColor = 'bg-background';
  let textColor = 'text-foreground';

  if (isAuthenticated && role === 'admin') {
    bgColor = 'bg-background';
    textColor = 'text-foreground';
    navItems = [
      <NavItem to="/" currentPath={location.pathname} onClick={closeMenu} key="home">
        <Home variant="Bulk" />
        Home
      </NavItem>,
      <NavItem to="/store" currentPath={location.pathname} onClick={closeMenu} key="store">
        <Shop variant="Bulk" />
        Store
      </NavItem>,
      <NavItem to="/aboutus" currentPath={location.pathname} onClick={closeMenu} key="aboutus">
        <Building variant="Bulk" />
        About Us
      </NavItem>,
      <NavItem to="/contactus" currentPath={location.pathname} onClick={closeMenu} key="contactus">
        <Call variant="Bulk" />
        Contact Us
      </NavItem>,
      <NavItem to="/admin/dashboard" currentPath={location.pathname} onClick={closeMenu} key="dashboard">
        <Category variant="Bulk" />
        Dashboard
      </NavItem>,
      <NavItem to="/admin/dashboard/product" currentPath={location.pathname} onClick={closeMenu} key="product">
        <Shop variant='Bulk' />
        Product
      </NavItem>,
      <NavItem to="/admin/dashboard/order" currentPath={location.pathname} onClick={closeMenu} key="order">
        <Box variant='Bulk' />
        Order
      </NavItem>,
      <NavItem to="/admin/dashboard/reviews" currentPath={location.pathname} onClick={closeMenu} key="reviews">
        <Book variant='Bulk' />
        Reviews
      </NavItem>,
      <NavItem to="/admin/dashboard/contactformdata" currentPath={location.pathname} onClick={closeMenu} key="contact">
        <Sms variant='Bulk' />
        Contact Data
      </NavItem>,
    ];
  } else if (isAuthenticated) {
    bgColor = 'bg-background';
    textColor = 'text-foreground';
    navItems = [
      <NavItem to="/" currentPath={location.pathname} onClick={closeMenu} key="home">
        <Home variant="Bulk" />
        Home
      </NavItem>,
      <NavItem to="/store" currentPath={location.pathname} onClick={closeMenu} key="store">
        <Shop variant="Bulk" />
        Store
      </NavItem>,
      <NavItem to="/aboutus" currentPath={location.pathname} onClick={closeMenu} key="aboutus">
        <Building variant="Bulk" />
        About Us
      </NavItem>,
      <NavItem to="/contactus" currentPath={location.pathname} onClick={closeMenu} key="contactus">
        <Call variant="Bulk" />
        Contact Us
      </NavItem>,
      <NavItem to="/user/dashboard" currentPath={location.pathname} onClick={closeMenu} key="dashboard">
        <Category variant="Bulk" />
        Dashboard
      </NavItem>,
      <NavItem to="/user/dashboard/order" currentPath={location.pathname} onClick={closeMenu} key="order">
        <Box variant='Bulk' />
        Order
      </NavItem>,
      <NavItem to="/user/dashboard/cart" currentPath={location.pathname} onClick={closeMenu} key="cart">
        <Book variant='Bulk' />
        Cart
      </NavItem>,
    ];
  } else {
    navItems = [
      <NavItem to="/" currentPath={location.pathname} onClick={closeMenu} key="home">
        Home
      </NavItem>,
      <NavItem to="/store" currentPath={location.pathname} onClick={closeMenu} key="store">
        Store
      </NavItem>,
      <NavItem to="/aboutus" currentPath={location.pathname} onClick={closeMenu} key="aboutus">
        About Us
      </NavItem>,
      <NavItem to="/contactus" currentPath={location.pathname} onClick={closeMenu} key="contactus">
        Contact Us
      </NavItem>,
    ];
  }

  return (
    <div className={`w-full h-20 flex flex-wrap items-center ${bgColor} ${textColor} justify-between p-2 border-b-2 sticky top-0 z-10`}>
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img src={LogoBlack} className="w-10 md:w-14" alt="Logo" />
        </Link>
        <ul className={`ml-4 space-x-4 hidden md:flex`}>
          {navItems}
        </ul>
        <div className='flex items-center gap-2'>
          {!isMobile && (
            isAuthenticated ? <UserDialogButton /> : <><Link to={"/auth/login"}><Button variant={'outline'}>Login</Button></Link></>
          )}
          {isMobile && (
            <>
              {isAuthenticated ? <UserDialogButton /> : <Link to={"/auth/login"}><Button variant={'outline'}>Login</Button></Link>}
              <Sheet>
                <SheetTrigger>
                  <Button variant={'outline'} className='p-2'>
                    <HambergerMenu className='text-primary'/>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <Link to="/" className='flex flex-row items-center justify-center gap-4 '>
                      <img src={LogoBlack} className=" w-14" alt="Logo" />
                      Trendy Closet
                    </Link>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <ul className="ml-4 md:flex flex-col">
                      {navItems}
                    </ul>
                  </div>
                </SheetContent>
                <SheetFooter>
                </SheetFooter>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </div >
  );
}

// Custom component to handle navigation links and highlight the active one
const NavItem: React.FC<NavItemProps> = ({ to, currentPath, children, onClick }) => {
  const isActive = to === currentPath;
  return (
    <li className='my-2'>
      <Link to={to} onClick={onClick}>
        <Button
          variant={'ghost'}
          className={`flex gap-2 w-full justify-start ${isActive ? 'border-2 border-border font-bold' : ''}`}
        >
          {children}
        </Button>
      </Link>
    </li>
  );
}

export default Header;
