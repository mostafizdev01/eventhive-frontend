import { DashboardLayout } from "@/src/components/modules/Dashboard/DashboardLayout"
import { UserRole } from "@/src/lib/auth-utils";
import { deleteCookie, getCookie } from "@/src/services/auth/tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {

  const accessToken = await getCookie("accessToken") || null;

  let userRole: UserRole | null = null;
  let userEmail 

  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_SECRET as string);

    if (typeof verifiedToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      redirect("/login")
    }
    userRole = verifiedToken.role;
    userEmail = verifiedToken?.email
  }

  return (
    <>
      <DashboardLayout role={userRole ?? "USER"} email={userEmail ?? "john@example.com"}>
        {children}
      </DashboardLayout>
    </>
  )
}

export default Layout