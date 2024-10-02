import Footer from "@/components/Footer";
import GenerateReport from "@/components/GenerateReport";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-evenly p-4">
      <GenerateReport />
      <Footer />
    </main>
  );
}
