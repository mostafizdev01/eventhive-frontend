import { Categories } from "@/src/components/modules/Home/Categories"
import FeaturedEvents from "@/src/components/modules/Home/FeaturedEvents"
import Hero from "@/src/components/modules/Home/Hero"
import HowItWorks from "@/src/components/modules/Home/HowItWorks"
import TopHosts from "@/src/components/modules/Home/TopHosts"

const HomePage = () => {
  return (
    <>
    <div className=" w-full">
      <Hero />
      <HowItWorks />
      <FeaturedEvents />
      <Categories />
      <TopHosts />
    </div>
    </>
  )
}

export default HomePage