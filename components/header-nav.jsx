import Link from "next/link";
import logo from "./logo";
export default function Headernav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background">
      <div className="container flex h-[70px] items-center">
        <Link href="/" className="flex items-center gap-2">
          <logo className="h-8 w-15" />
          <span className="text-xl font-bold text-primary">Cinescope</span>
        </Link>
        <nav className="flex items-center gap-4 ml-auto">
          <Link href="/" className="text-sm font-medium transition-colors ">
            Movies
          </Link>
          <Link
            href="/genres"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Genres
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
