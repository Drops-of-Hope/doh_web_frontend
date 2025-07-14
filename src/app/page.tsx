import { NavBar, Hero, Footer, Section2, TestimonialsSection } from "@/components";

export default async function Home() {
  
  return (  
    <main>
      {/* <NavBar />
      <Hero />
      <div id="section-1" className="flex flex-col items-center justify-center">
        <Section2/>
      </div>
      <Footer /> */}

      <TestimonialsSection 
        testimonials={[
          {
            name: "John Doe",
            role: "Volunteer",
            message: "This organization has changed my life for the better!",
            image: "/images/john_doe.jpg",
            rating: 5
          },
          {
            name: "Jane Smith",
            role: "Donor",
            message: "I love supporting such a great cause!",
            image: "/images/jane_smith.jpg",
            rating: 4.5
          },
          {
            name: "Din Din",
            role: "Donor",
            message: "I love supporting such a great cause!",
            image: "/images/jane_smith.jpg",
            rating: 4.5
          },
          {
            name: "Din Din",
            role: "Donor",
            message: "I love supporting such a great cause!ysrguyrwgfuweufyqegfyhgfygyefbueadbueqfgyuqebvhjerfgjesgfysegryurefyeqfuqef",
            image: "/assets/doctor.png",
            rating: 4.5
          },
          {
            name: "Din Din",
            role: "Donor",
            message: "I love supporting such a great cause!",
            image: "/images/jane_smith.jpg",
            rating: 4.5
          }
        ]}
        
      />

      



    </main>
  );
}