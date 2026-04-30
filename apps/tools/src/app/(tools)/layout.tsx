import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-4xl py-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
