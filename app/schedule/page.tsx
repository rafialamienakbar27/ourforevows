import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScheduleClient from "@/components/Schedule";

export const metadata = {
  title: "Jadwal Kami — Our Forevows",
  description: "Lihat jadwal dan ketersediaan Our Forevows untuk hari spesial Anda.",
};

export default function SchedulePage() {
  return (
    <>
      <Navbar />
      <main>
        <ScheduleClient />
      </main>
      <Footer />
    </>
  );
}
