import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { User } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link here

const UserDialogButton = () => {
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
                <DropdownMenuTrigger>
                    {/* <img src={profile ? profile : "./user-avtar.png"} className="w-10 h-10 md:w-14 md:h-14 border-2 rounded-full" alt="User Avatar" /> */}
                    {/* <img src="./user-avtar.png" className="w-10 h-10 md:w-14 md:h-14 border-2 rounded-full" alt="User Avatar" /> */}
                    <div className="w-10 h-10 md:w-14 md:h-14 border-2 rounded-full flex items-center justify-center">
                    <User variant="Bulk" size={28}/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {isAuthenticated ? (
                        <>
                            <DropdownMenuLabel>{name ? name : "Krunal Admin"}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
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

export default UserDialogButton;
