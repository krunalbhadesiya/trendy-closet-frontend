import { Link } from "react-router-dom"
import Logo from "../assets/Logo-Black.png"
function Footer() {
    return (

        <footer className="bg-muted text-muted-foreground py-8 px-6 md:px-8">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <img src={Logo} className="w-14" alt="Logo" />
                        <span className="text-lg font-bold text-primary">Trendy Closet</span>
                    </div>
                    <p className="text-sm leading-relaxed text-justify">
                        Trendy Closet is your ultimate destination for fashionable and high-quality t-shirts. We specialize in providing a wide range of trendy designs, sizes, and colors to suit every style. Whether you're looking for casual wear or something unique, we've got you covered. Shop with us for premium quality, exceptional customer service, and the latest in t-shirt fashion.
                    </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
                    <nav className="flex flex-col gap-2">
                        <Link to={"/home"} className="text-sm hover:underline" >
                            Home
                        </Link>
                        <Link to={"/store"} className="text-sm hover:underline" >
                            Store
                        </Link>
                        <Link to={"/policies"} className="text-sm hover:underline" >
                            Policies
                        </Link>

                        <Link to={"/aboutus"} className="text-sm hover:underline" >
                            About
                        </Link>
                        <Link to={"/contactus"} className="text-sm hover:underline" >
                            Contact
                        </Link>
                    </nav>
                </div>

            </div>
            <div className="mt-8 text-center text-sm border-t-2 pt-2">&copy; 2024 Trendy Closet. All rights reserved.</div>
        </footer>
    )
}

export default Footer