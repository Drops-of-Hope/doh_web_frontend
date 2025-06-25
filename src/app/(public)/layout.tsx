import { NavBar } from "@/components";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <NavBar />
        {children}
    </div>
  );
}