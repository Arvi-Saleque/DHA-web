import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import HeroSection from "@/app/homepage/HeroSection";
import AboutSection from "@/app/homepage/AboutSection";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // <-- add this line

export default async function HomePage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: 1 } });

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
    </main>
  );
}
