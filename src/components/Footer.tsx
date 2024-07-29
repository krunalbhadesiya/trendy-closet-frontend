
function Footer() {
    return (

        <footer className="bg-muted p-6 md:py-12 w-full">
            <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
                <div className="grid gap-1">
                    <h3 className="font-semibold">Shop</h3>
                    <a href="#">All Products</a>
                    <a href="#">Home</a>
                    <a href="#">Fashion</a>
                    <a href="#">Electronics</a>
                </div>
                <div className="grid gap-1">
                    <h3 className="font-semibold">Company</h3>
                    <a href="#">About Us</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Careers</a>
                    <a href="#">Press</a>
                </div>
                <div className="grid gap-1">
                    <h3 className="font-semibold">Support</h3>
                    <a href="#">FAQ</a>
                    <a href="#">Returns</a>
                    <a href="#">Shipping</a>
                    <a href="#">Warranty</a>
                </div>
                <div className="grid gap-1">
                    <h3 className="font-semibold">Legal</h3>
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Cookie Policy</a>
                </div>
                <div className="grid gap-1">
                    <h3 className="font-semibold">Join Now</h3>
                    <p className="text-muted-foreground">Sign up for exclusive offers and updates.</p>
                    <form className="flex gap-2">
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            type="submit"
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>
            <div className="container max-w-7xl mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
                <p>© 2024 Acme Store. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer