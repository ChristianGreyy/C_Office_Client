import Aside from '@/components/Aside';
import Content from '@/components/Content';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';

export default function Home() {
  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-white dark:bg-[#121212]">
        <Navbar />
        <div className="container mx-auto mt-24 px-12 py-4 flex">
        </div>
        <Footer />
      </main>
    </Providers>
  );
}
