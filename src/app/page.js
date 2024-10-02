import Footer from "@/components/Footer";
import GenerateReport from "@/components/GenerateReport";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-lg flex-col gap-4 p-4 max-md:pt-10 md:items-center md:justify-evenly">
      <GenerateReport />
      <Footer />
    </main>
  );
}
