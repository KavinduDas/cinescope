import Headernav from "@/components/header-nav";
import FeaturedMovies from "@/components/home/featured-movies";
import HeroBanner from "@/components/home/hero-banner";

//SSR - server side rendered - server component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Headernav />
      {/* <main className="flex 1">OUR MAIN SECTION</main> */}
      <HeroBanner />
      <FeaturedMovies />
      <footer className="bg-amber-400 h-72">Our new Footer</footer>
    </div>
  );
}
