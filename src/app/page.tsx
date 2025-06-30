import { NavBar, Hero } from "@/components";
import { auth, signIn, signOut } from "@/auth"


export default async function Home() {
  const session = await auth();
  
  return (  
    <main>
      <NavBar />
      <Hero />
      <div id="section-1" className="h-[100vh] flex flex-col items-center justify-center">
        next section to test the hero button scrollable function
      </div>

    </main>
  );
}