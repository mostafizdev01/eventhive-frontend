import { Categories } from "@/src/components/modules/Home/Categories"
import FeaturedEvents from "@/src/components/modules/Home/FeaturedEvents"
import Hero from "@/src/components/modules/Home/Hero"
import HowItWorks from "@/src/components/modules/Home/HowItWorks"
import Testimonials from "@/src/components/modules/Home/Testimonials"
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
      <Testimonials />
    </div>
    </>
  )
}

export default HomePage