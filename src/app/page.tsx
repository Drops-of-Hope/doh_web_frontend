import { NavBar, Hero } from "@/components";

export default function Home() {

  return (
    <main>
      <NavBar />
      <Hero />
      <Hero />
    </main>
  );
}

// root page (eg- landing page)
// All pages must be created within the app folder 

//structure
// eg- login page must be inside app->auth->login->page.tsx