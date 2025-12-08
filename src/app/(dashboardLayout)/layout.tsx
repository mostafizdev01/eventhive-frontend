import { DashboardLayout } from "@/src/components/modules/Dashboard/DashboardLayout"

const Layout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <DashboardLayout />
      <div className=" flex flex-1 flex-col justify-center items-center">
        { children }
      </div>
    </>
  )
}

export default Layout