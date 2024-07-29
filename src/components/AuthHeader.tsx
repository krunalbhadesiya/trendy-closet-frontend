import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import LogoD from '../assets/Logo-D.png';
import LogoL from '../assets/Logo-l.png';
import { Button } from './ui/button';
import { Category, HambergerMenu, Home, Sms, Box, Book, Shop } from 'iconsax-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import { useTheme } from '../components/theme-provider';

interface NavItemProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
}

const AuthHeader: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); // Get authentication status and logout function
  const { theme } = useTheme();  // Use the useTheme hook to get the current theme


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

  return (
    <div className="w-full flex flex-wrap items-center bg-background justify-between p-2 md:p-4 border-b-2 sticky top-0 z-10">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img src={theme === 'dark' ? LogoD : LogoL} className="w-14" alt="Logo" />
        </Link>
        <ul className={`ml-4 space-x-4 hidden md:flex`}>
          <NavItem to="/" currentPath={location.pathname}>
            <Home variant="TwoTone" />
            Home
          </NavItem>
          <NavItem to="/dashboard" currentPath={location.pathname}>
            <Category variant="TwoTone" />
            Dashboard
          </NavItem>
          <NavItem to="/dashboard/product" currentPath={location.pathname}>
            <Shop variant='TwoTone' />
            Product
          </NavItem>
          <NavItem to="/dashboard/order" currentPath={location.pathname}>
            <Box variant='TwoTone' />
            Order
          </NavItem>
          <NavItem to="/dashboard/review" currentPath={location.pathname}>
            <Book variant='TwoTone' />
            Reviews
          </NavItem>
          <NavItem to="/dashboard/ContactData" currentPath={location.pathname}>
            <Sms variant='TwoTone' />
            Contact Data
          </NavItem>
        </ul>
        <div className='flex items-center gap-2'>
          {isAuthenticated ? (
            <Button variant={"outline"} onClick={logout}>Logout</Button>
          ) : (
            <Link to="/login">
              <Button variant={"outline"}>Login</Button>
            </Link>
          )}
          <ModeToggle />
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} className='p-2'>
                  <HambergerMenu size="32" variant="TwoTone" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className='mx-auto'>
                    <Link to="/">
                      <img src={theme === 'dark' ? LogoD : LogoL} className="mx-auto w-14" alt="Logo" />
                    </Link>
                    Lotus Group
                  </SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <ul className="ml-4 md:flex">
                    <NavItem to="/" currentPath={location.pathname}>
                      <Home variant="TwoTone" />
                      Home
                    </NavItem>
                    <NavItem to="/dashboard" currentPath={location.pathname}>
                      <Category variant="TwoTone" />
                      Dashboard
                    </NavItem>
                    <NavItem to="/dashboard/product" currentPath={location.pathname}>
                      <Shop variant='TwoTone' />
                      Product
                    </NavItem>
                    <NavItem to="/dashboard/order" currentPath={location.pathname}>
                      <Box variant='TwoTone' />
                      Order
                    </NavItem>
                    <NavItem to="/dashboard/review" currentPath={location.pathname}>
                      <Book variant='TwoTone' />
                      Reviews
                    </NavItem>
                    <NavItem to="/dashboard/ContactData" currentPath={location.pathname}>
                      <Sms variant='TwoTone' />
                      Contact Data
                    </NavItem>
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </div>
  );
}

// Custom component to handle navigation links and highlight the active one
const NavItem: React.FC<NavItemProps> = ({ to, currentPath, children }) => {
  const isActive = to === currentPath;
  return (
    <li>
      <Link to={to} className={isActive ? 'bg-secondary' : ''}>
        <Button variant={'ghost'} className={`flex gap-2 ${isActive ? 'border-2 border-border' : ''}`}>
          {children}
        </Button>
      </Link>
    </li>
  );
}

export default AuthHeader;
