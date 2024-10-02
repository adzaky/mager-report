import Footer from "@/components/Footer";
import GenerateReport from "@/components/GenerateReport";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-lg flex-col p-4 md:items-center md:justify-evenly">
      <GenerateReport />
      <Footer />
    </main>
  );
}
