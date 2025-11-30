import { Categories } from "@/src/components/modules/Home/Categories"
import FAQ from "@/src/components/modules/Home/FAQ"
import FeaturedEvents from "@/src/components/modules/Home/FeaturedEvents"
import GetStarted from "@/src/components/modules/Home/GetStarted"
import Hero from "@/src/components/modules/Home/Hero"
import HowItWorks from "@/src/components/modules/Home/HowItWorks"
import Testimonials from "@/src/components/modules/Home/Testimonials"
import TopHosts from "@/src/components/modules/Home/TopHosts"
import WhyToChooseUs from "@/src/components/modules/Home/WhyToChooseUs"

const HomePage = () => {
  return (
    <>
    <div className=" w-full">
      <Hero />
      <WhyToChooseUs />
      <HowItWorks />
      <FeaturedEvents />
      <Categories />
      <TopHosts />
      <Testimonials />
      <FAQ />
      <GetStarted />
    </div>
    </>
  )
}

export default HomePage