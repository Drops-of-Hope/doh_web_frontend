import { NavBar, Footer } from "@/components";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white">
        <NavBar />
        {children}
        <div className="mt-8">
          <Footer />
        </div>
        
    </div>
  );
}