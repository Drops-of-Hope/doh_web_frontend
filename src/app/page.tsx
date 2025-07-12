import { NavBar, Hero, Footer, Section2, Banner } from "@/components";

export default async function Home() {
  
  return (  
    <main>
      <NavBar />
      <Hero />
      <div id="section-1" className="flex flex-col items-center justify-center">
        <Section2/>
      </div>
      <Banner />
      <Footer />

    </main>
  );
}