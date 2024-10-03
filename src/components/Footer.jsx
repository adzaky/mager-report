import ThemeToggle from "./ui/theme-toggle";

const Footer = () => {
  return (
    <footer className="mx-auto flex w-full items-center gap-2 rounded-2xl border p-6 md:py-4">
      <p className="max-md:text-xs">Made with Next.js, shadcnUI, and TailwindCSS, using my last 3 brain cells.</p>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
