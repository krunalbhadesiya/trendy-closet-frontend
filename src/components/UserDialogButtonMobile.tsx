import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link here
import { Button } from "./ui/button";

const UserDialogButtonMobile = () => {
    // const [profile, setProfile] = useState<string>("");
    const [name, setName] = useState<string>("");
    const { isAuthenticated, logout } = useAuth(); // Get authentication status and logout function

    useEffect(() => {
        // Retrieve data from localStorage
        // const localProfile = localStorage.getItem("profile");
        const localName = localStorage.getItem("name");

        // Update state
        // if (localProfile) setProfile(localProfile);
        if (localName) setName(localName);
    }, []);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full">
                    <Button variant={"outline"} className="w-full h-12">
                        <img src="./user-avtar.png" className=" w-10 h-10 mr-4 md:w-14 md:h-14 border-2 rounded-full" alt="User Avatar" />
                        {name ? name : "Krunal Admin"}
                    </Button>
                    {/* <img src={profile ? profile : "./user-avtar.png"} className="w-10 h-10 md:w-14 md:h-14 border-2 rounded-full" alt="User Avatar" /> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                    {isAuthenticated ? (
                        <>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Setting</DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem>
                                <Link to="/auth/login">
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to="/auth/register">
                                    Register
                                </Link>
                            </DropdownMenuItem>

                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    );
}

export default UserDialogButtonMobile;
