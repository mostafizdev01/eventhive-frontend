import FeaturedEvents from "@/src/components/modules/Home/FeaturedEvents"
import Hero from "@/src/components/modules/Home/Hero"
import HowItWorks from "@/src/components/modules/Home/HowItWorks"

const HomePage = () => {
  return (
    <>
    <div className=" w-full">
      <Hero />
      <HowItWorks />
      <FeaturedEvents />
    </div>
    </>
  )
}

export default HomePage