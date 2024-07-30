import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo-Black.png';
import { Button } from './ui/button';
import { Category, HambergerMenu, Box, Book, Shop } from 'iconsax-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import UserDialogButton from './UserDialogButton';
import UserDialogButtonMobile from './UserDialogButtonMobile';
interface NavItemProps {
    to: string;
    currentPath: string;
    children: React.ReactNode;
}

const UserHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();


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

                    <NavItem to="/user/dashboard" currentPath={location.pathname}>
                        <Category variant="Bulk" />
                        Dashboard
                    </NavItem>
                    <NavItem to="/user/dashboard/order" currentPath={location.pathname}>
                        <Box variant='Bulk' />
                        Order
                    </NavItem>
                    <NavItem to="/user/dashboard/cart" currentPath={location.pathname}>
                        <Book variant='Bulk' />
                        Cart
                    </NavItem>

                </ul>
                <div className='flex items-center gap-2'>
                    {!isMobile && (
                        <UserDialogButton />
                    )}                    {isMobile && (
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
                                            <ul className="ml-4 md:flex">
                                                <NavItem to="/user/dashboard" currentPath={location.pathname}>
                                                    <Category variant="Bulk" />
                                                    Dashboard
                                                </NavItem>
                                                <NavItem to="/user/dashboard/order" currentPath={location.pathname}>
                                                    <Shop variant='Bulk' />
                                                    Product
                                                </NavItem>
                                                <NavItem to="/user/dashboard/cart" currentPath={location.pathname}>
                                                    <Box variant='Bulk' />
                                                    Order
                                                </NavItem>
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
const NavItem: React.FC<NavItemProps> = ({ to, currentPath, children }) => {
    const isActive = to === currentPath;
    return (
        <li className='my-2'>
            <Link to={to} className={isActive ? 'bg-secondary' : ''}>
                <Button variant={'ghost'} className={`flex gap-2 ${isActive ? 'border-2 border-border' : ''}`}>
                    {children}
                </Button>
            </Link>
        </li>
    );
}

export default UserHeader;
