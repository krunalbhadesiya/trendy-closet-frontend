import React from 'react';
import { Link} from 'react-router-dom';

const Auth: React.FC = () => {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8">
                    <div className="flex flex-col items-center justify-center">
                        <div className="animate-fade-in-up mb-8 text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                Welcome to our Ecommerce Store
                            </h1>
                            <p className="mt-4 text-muted-foreground">
                                Discover the best products and enjoy a seamless shopping experience.
                            </p>
                        </div>
                        <div className="animate-fade-in-up space-y-4">
                            <Link
                                to="/auth/login"
                                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/register"
                                className="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                            >
                                Register
                            </Link>
                            <Link
                                to="/auth/forget"
                                className="inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                Forgot Password
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
