import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { Button } from './ui/button';
import { Category, HambergerMenu, Home, Sms, Box, Book, Shop } from 'iconsax-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useAuth } from '../hooks/useAuth';
interface NavItemProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
}

const AuthHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); // Get authentication status and logout function


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
          <img src={Logo} className="w-14" alt="Logo" />
        </Link>
        <ul className={`ml-4 space-x-4 hidden md:flex`}>
          <NavItem to="/" currentPath={location.pathname}>
            <Home variant="Bulk" />
            Home
          </NavItem>
          <NavItem to="/dashboard" currentPath={location.pathname}>
            <Category variant="Bulk" />
            Dashboard
          </NavItem>
          <NavItem to="/dashboard/product" currentPath={location.pathname}>
            <Shop variant='Bulk' />
            Product
          </NavItem>
          <NavItem to="/dashboard/order" currentPath={location.pathname}>
            <Box variant='Bulk' />
            Order
          </NavItem>
          <NavItem to="/dashboard/review" currentPath={location.pathname}>
            <Book variant='Bulk' />
            Reviews
          </NavItem>
          <NavItem to="/dashboard/ContactData" currentPath={location.pathname}>
            <Sms variant='Bulk' />
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
          {isMobile && (
            <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DialogTrigger>
                <Button variant={"outline"} className='p-2' >
                  <HambergerMenu size="32" variant="Bulk" />
                </Button>
              </DialogTrigger>
              <DialogContent className='w-full h-screen'>
                <DialogHeader>
                  <DialogTitle>
                    <Link to="/">
                      <img src={Logo} className="mx-auto w-14" alt="Logo" />
                      Trendy Closet
                    </Link>
                  </DialogTitle>
                  <DialogDescription>
                    <div className="grid gap-4 py-4">
                      <ul className="ml-4 md:flex">
                        <NavItem to="/" currentPath={location.pathname}>
                          <Home variant="Bulk" />
                          Home
                        </NavItem>
                        <NavItem to="/dashboard" currentPath={location.pathname}>
                          <Category variant="Bulk" />
                          Dashboard
                        </NavItem>
                        <NavItem to="/dashboard/product" currentPath={location.pathname}>
                          <Shop variant='Bulk' />
                          Product
                        </NavItem>
                        <NavItem to="/dashboard/order" currentPath={location.pathname}>
                          <Box variant='Bulk' />
                          Order
                        </NavItem>
                        <NavItem to="/dashboard/review" currentPath={location.pathname}>
                          <Book variant='Bulk' />
                          Reviews
                        </NavItem>
                        <NavItem to="/dashboard/ContactData" currentPath={location.pathname}>
                          <Sms variant='Bulk' />
                          Contact Data
                        </NavItem>
                      </ul>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
