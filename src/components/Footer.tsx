import LogoD from "../assets/Logo-D.png";
import LogoL from '../assets/Logo-l.png';
import { useTheme } from '../components/theme-provider';
import { Link } from "react-router-dom";
import { DribbbleIcon, GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { Button } from "./ui/button";

function Footer() {
    const { theme } = useTheme();  // Use the useTheme hook to get the current theme


    return (

        <footer className=" py-6 px-4 md:px-6 border-t-2">
            <div className="px-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        {/* <img src={LogoD} className="w-14" alt="Logo" /> */}
                        <img src={theme === 'dark' ? LogoD : LogoL} className="w-14" alt="Logo" />

                        <span className="text-lg font-bold ">Lotus Group IT Solution</span>
                    </div>
                    <p className="text-sm leading-relaxed text-justify">
                        Lotus Group IT Solution is a leading provider of innovative technology solutions for businesses of all sizes. We
                        specialize in software development, IT management, and cloud services.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h4 className=" font-semibold">Quick Links</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link className="hover:font-semibold transition-transform" to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:font-semibold transition-transform" to="/service">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:font-semibold transition-transform" to="/portfolio">
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:font-semibold transition-transform" to="/aboutus">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:font-semibold transition-transform" to="/contactus">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className=" font-semibold">Services</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link className="hover:font-semibold transition-transform" to="/service/web-development">
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:font-semibold transition-transform" to="/service/software-development">
                                    Software Development
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:font-semibold transition-transform" to="/service/ui-ux-design">
                                    Ui Ux Design
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:font-semibold transition-transform" to="/service/it-consulting">
                                    IT Consulting
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="space-y-2">
                    <h4 className=" font-semibold">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a className="hover:font-semibold transition-transform" href="https://x.com/LotusGroupDev" target="_blank">
                            <Button variant={"ghost"}>
                                <TwitterIcon />
                            </Button>
                        </a>
                        <a className="hover:font-semibold transition-transform" href="https://www.linkedin.com/company/lotusgroupdev" target="_blank" >
                            <Button variant={"ghost"}>
                                <LinkedinIcon />
                            </Button>
                        </a>
                        <a className="hover:font-semibold transition-transform" href="https://github.com/lotusgroupdev" target="_blank">
                            <Button variant={"ghost"}>
                                <GithubIcon />
                            </Button>
                        </a>
                        <a className="hover:font-semibold transition-transform" href="https://www.instagram.com/lotusgroup.dev/" target="_blank">
                            <Button variant={"ghost"}>
                                <InstagramIcon />
                            </Button>
                        </a>
                        <a className="hover:font-semibold transition-transform" href="https://dribbble.com/lotusgroupdev" target="_blank">
                            <Button variant={"ghost"}>
                                <DribbbleIcon />
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-4 pt-4 text-center text-sm border-t-2 border-border  ">© 2024 Lotus Group IT Solution. All rights reserved.</div>
        </footer>
    )
}

export default Footer