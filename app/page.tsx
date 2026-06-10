import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Schedule from "@/components/Schedule";
import Footer from "@/components/Footer";
import { sanityFetch, queries } from "@/lib/sanity";

export default async function Home() {
  const [testimonials, services, portfolio, settings] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sanityFetch<any[]>(queries.testimonials),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sanityFetch<any[]>(queries.services),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sanityFetch<any[]>(queries.portfolio),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sanityFetch<any>(queries.siteSettings),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services data={services ?? undefined} />
        <Portfolio data={portfolio ?? undefined} />
        <Process />
        <Testimonials data={testimonials ?? undefined} />
        <Schedule />
      </main>
      <Footer settings={settings ?? undefined} />
    </>
  );
}
