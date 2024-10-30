import Footer from "@/components/Footer";
import FormatReport from "@/components/FormatReport";

const Home = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-lg flex-col gap-4 p-4 max-md:pt-10 md:items-center md:justify-evenly">
      <FormatReport />
      <Footer />
    </main>
  );
};

export default Home;
