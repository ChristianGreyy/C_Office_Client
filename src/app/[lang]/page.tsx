import AboutSection from '@/components/AboutSection';
import AchievementsSection from '@/components/AchievementsSection';
import EmailSection from '@/components/EmailSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';
import Providers from '@/components/Providers';
import TimeLineSection from '@/components/TimeLineSection';

export default function Home() {
  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-white dark:bg-[#121212]">
        <Navbar />
        <div className="container mx-auto mt-24 px-12 py-4">
          <HeroSection />
          <AchievementsSection />
          <TimeLineSection />
          <AboutSection />
          <ProjectsSection />
          <EmailSection />
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
