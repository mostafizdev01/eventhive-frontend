import { Footer } from "@/src/components/shared/Footer";
import { Navbar } from "@/src/components/shared/Navbar";


function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" flex flex-col min-h-dvh">
            <Navbar />
            <div className=" flex flex-1 justify-center items-center mt-24 overflow-hidden">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default CommonLayout;