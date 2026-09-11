import Hero from "@/components/homePage/Hero";
import HowItWorks from "@/components/homePage/HowItWorks";
import PopularCategories from "@/components/homePage/PopularCategories";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero/>
    <PopularCategories/>
    <HowItWorks/>

    </>
  );
}
