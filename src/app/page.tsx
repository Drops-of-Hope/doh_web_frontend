import { NavBar, Hero, MetricCard } from "@/components";

export default async function Home() {
  
  return (  
    <main>
      {/* <NavBar />
      <Hero />
      <div id="section-1" className="h-[100vh] flex flex-col items-center justify-center">
        next section to test the hero button scrollable function
      </div> */}

      <MetricCard
        icon="./assets/BloodDrop.png" 
        iconBgColor="#FB7373"
        heading={"Total \nDonations"}
        body="Total number of donations made"
        count={1200}
      />

    </main>
  );
}