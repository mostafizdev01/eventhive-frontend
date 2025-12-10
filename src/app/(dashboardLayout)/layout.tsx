import { DashboardLayout } from "@/src/components/modules/Dashboard/DashboardLayout"
import { UserRole } from "@/src/lib/auth-utils";
import { deleteCookie, getCookie } from "@/src/services/auth/tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const Layout = async ({ children }: { children: React.ReactNode }, request: NextRequest) => {

  const accessToken = await getCookie("accessToken") || null;

  let userRole: UserRole | null = null;
  let userEmail 
  let name 
  let profilePhoto 

  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_SECRET as string);

    if (typeof verifiedToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL('/login', request.url));
    }
    userRole = verifiedToken.role;
    userEmail = verifiedToken?.email
    name = verifiedToken?.name
    profilePhoto = verifiedToken?.profilePhoto
  }

  return (
    <>
      <DashboardLayout role={userRole ?? "USER"} email={userEmail ?? "john@example.com"} name={name ?? "John Doe"} profilePhoto={profilePhoto ?? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"}>
        {children}
      </DashboardLayout>
    </>
  )
}

export default Layout