import Headernav from "@/components/header-nav";

//SSR - server side rendered - server component
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Headernav />
      <main className="bg-primary h-screen">OUR MAIN SECTION</main>
      <footer className="bg-amber-400 h-72">Our new Footer</footer>
    </div>
  );
}
