import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo-White.png';
import { Button } from './ui/button';
import { HambergerMenu } from 'iconsax-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserDialogButton from './UserDialogButton';
import UserDialogButtonMobile from './UserDialogButtonMobile';

interface NavItemProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
  onClick?: () => void; // Add onClick prop
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <div className="w-full h-20 flex flex-wrap items-center bg-primary text-primary-foreground justify-between p-2  border-b-2 sticky top-0 z-10">
      <div className="w-full flex items-center justify-between ">
        <Link to="/">
          <img src={Logo} className="w-10 md:w-14" alt="Logo" />
        </Link>
        <ul className={`ml-4 space-x-4 hidden md:flex`}>
          <NavItem to="/" currentPath={location.pathname}>Home</NavItem>
          <NavItem to="/store" currentPath={location.pathname}>Store</NavItem>
          <NavItem to="/aboutus" currentPath={location.pathname}>About Us</NavItem>
          <NavItem to="/contactus" currentPath={location.pathname}>Contact Us</NavItem>
        </ul>
        <div className='flex items-center  gap-2'>
          {!isMobile && (
            <UserDialogButton />
          )}
          {/* <Link to="/login">
            <Button variant={"outline"}>Login</Button>
          </Link> */}
          {/* <ModeToggle /> */}
          {isMobile && (
            <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DialogTrigger>
                <HambergerMenu size="32" variant="Bulk" />
              </DialogTrigger>
              <DialogContent className='w-full h-screen'>
                <DialogHeader>
                  <DialogTitle>
                    <Link to="/" className='flex flex-row items-center justify-center gap-4 '>
                      <img src={Logo} className=" w-14" alt="Logo" />
                      Trendy Closet
                    </Link>
                  </DialogTitle>
                  <DialogDescription>
                    <div className="grid gap-4 py-4">
                      <ul className="ml-4  md:flex">
                        <NavItem to="/" currentPath={location.pathname} onClick={closeMenu}>Home</NavItem>
                        <NavItem to="/store" currentPath={location.pathname} onClick={closeMenu}>Store</NavItem>
                        <NavItem to="/aboutus" currentPath={location.pathname} onClick={closeMenu}>About Us</NavItem>
                        <NavItem to="/contactus" currentPath={location.pathname} onClick={closeMenu}>Contact Us</NavItem>
                      </ul>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <div className='w-full flex flex-col gap-2'>
                    <UserDialogButtonMobile />
                    <DialogClose asChild className='w-full'>
                      <Button type="button" variant="outline">
                        Close
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}

// Custom component to handle navigation links and highlight the active one
const NavItem: React.FC<NavItemProps> = ({ to, currentPath, children, onClick }) => {
  const isActive = to === currentPath;
  return (
    <li>
      <Button variant={'ghost'} className='w-full' onClick={onClick}>
        <Link to={to} className={isActive ? 'font-bold' : ''}>{children}</Link>
      </Button>
    </li>
  );
}


export default Header;
