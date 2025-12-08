/* eslint-disable react/no-children-prop */
import { DashboardLayout } from "@/src/components/modules/Dashboard/DashboardLayout"

const Layout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <DashboardLayout children={children} />
    </>
  )
}

export default Layout