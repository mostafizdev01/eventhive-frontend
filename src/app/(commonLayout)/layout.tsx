import { getCookie } from "@/src/services/auth/tokenHandlers";
import { Footer } from "@/src/components/shared/Footer";
import { Navbar } from "@/src/components/shared/Navbar";


async function CommonLayout({ children }: { children: React.ReactNode }) {
    const accessToken = await getCookie("accessToken") || "";

return (
    <div className=" flex flex-col min-h-dvh">
        <Navbar accessToken={accessToken} />
        <div className=" flex flex-1 justify-center items-center overflow-hidden">
            {children}
        </div>
        <Footer />
    </div>
)
}

export default CommonLayout;