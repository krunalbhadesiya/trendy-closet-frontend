import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import LogoL from '../assets/Logo-l.png';
import LogoD from '../assets/Logo-D.png';
import { Button } from './ui/button';
import { HambergerMenu } from 'iconsax-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from '../components/theme-provider';

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
  const { theme } = useTheme();  // Use the useTheme hook to get the current theme

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <div className="w-full flex flex-wrap items-center bg-background justify-between p-4 md:p-6 border-b-2 sticky top-0 z-10">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img src={theme === 'dark' ? LogoD : LogoL} className="w-14" alt="Logo" />
        </Link>
        <ul className={`ml-4 space-x-4 hidden md:flex`}>
          <NavItem to="/" currentPath={location.pathname}>Home</NavItem>
          <NavItem to="/store" currentPath={location.pathname}>Store</NavItem>
          <NavItem to="/aboutus" currentPath={location.pathname}>About Us</NavItem>
          <NavItem to="/contactus" currentPath={location.pathname}>Contact Us</NavItem>
        </ul>
        <div className='flex items-center gap-2'>
          {/* <Link to="/login">
            <Button variant={"outline"}>Login</Button>
          </Link> */}
          <ModeToggle />
          {isMobile && (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant={"outline"} className='p-2' onClick={toggleMenu}>
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
                  <ul className="ml-4  md:flex">
                    <NavItem to="/" currentPath={location.pathname} onClick={closeMenu}>Home</NavItem>
                    <NavItem to="/service" currentPath={location.pathname} onClick={closeMenu}>Services</NavItem>
                    <ul className="pl-3 ">
                      <NavItem to="/service/web-development" currentPath={location.pathname} onClick={closeMenu}>Web Development</NavItem>
                      <NavItem to="/service/software-development" currentPath={location.pathname} onClick={closeMenu}>Software Development</NavItem>
                      <NavItem to="/service/ui-ux-design" currentPath={location.pathname} onClick={closeMenu}>Ui Ux Design</NavItem>
                      <NavItem to="/service/it-consulting" currentPath={location.pathname} onClick={closeMenu}>IT Consulting</NavItem>
                    </ul>
                    <NavItem to="/portfolio" currentPath={location.pathname} onClick={closeMenu}>Portfolio</NavItem>
                    <NavItem to="/aboutus" currentPath={location.pathname} onClick={closeMenu}>About Us</NavItem>
                    {/* <NavItem to="/blog" currentPath={location.pathname}>Blog</NavItem> */}
                    <NavItem to="/contactus" currentPath={location.pathname} onClick={closeMenu}>Contact Us</NavItem>
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
