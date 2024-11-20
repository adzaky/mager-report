import { useClerk } from "@clerk/nextjs";
import { Button } from "./button";

const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <Button variant="destructive" className="px-6 font-bold" onClick={() => signOut({ redirectUrl: "/sign-in" })}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
