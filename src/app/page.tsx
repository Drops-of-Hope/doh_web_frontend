import { Hero, NavBar } from "@/components";

export default function Home() {

  return (
    <main className="bg-white">
      <NavBar />
      <Hero />
      <div id="section-1" className="h-[100vh] flex flex-col items-center justify-center">
        next section to test the hero button scrollable function
      </div>

    </main>
  );
}