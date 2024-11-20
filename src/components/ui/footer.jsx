import { SignedOut } from "@clerk/nextjs";
import SignOut from "./signout-button";
import ThemeToggle from "./theme-toggle";
import { SignedIn } from "@clerk/nextjs";
import SignIn from "./signin-button";

const Footer = () => {
  return (
    <footer className="mx-auto flex w-full flex-col gap-2 rounded-2xl border p-6 md:py-4">
      <div className="inline-flex flex-wrap items-center gap-2">
        <p className="text-xs md:text-sm">Made with Next.js, shadcnUI, and TailwindCSS, using my last 3 brain cells.</p>
        <ThemeToggle />
      </div>
      <div className="w-full">
        <SignedIn>
          <SignOut />
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </div>
    </footer>
  );
};

export default Footer;
