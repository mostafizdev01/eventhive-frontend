"use client";

import { logoutUser } from "@/src/services/auth/logoutUser";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutUser();
    };
    return (
        <div className="text-destructive flex items-center cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
                  Sign out
        </div>
    );
};

export default LogoutButton;