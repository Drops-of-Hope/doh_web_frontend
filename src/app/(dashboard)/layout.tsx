import { SideBar, Header } from "@/components";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto bg-green-100">
          <div className="w-full flex justify-center mx-auto bg-white">
            <div className="w-full md:max-w-6xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}