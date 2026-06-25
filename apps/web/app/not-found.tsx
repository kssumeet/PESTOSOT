import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50/60 to-white px-4 text-center">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative">
        <p className="font-display text-[7rem] font-extrabold leading-none text-gradient sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-navy-900">
          This page scurried away
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-600">
          The page you&apos;re looking for doesn&apos;t exist — but our pest-free homepage does.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button size="lg">
              <Home className="size-4" /> Back to home
            </Button>
          </Link>
          <Link href="/#services">
            <Button size="lg" variant="outline">
              <Search className="size-4" /> Browse services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
