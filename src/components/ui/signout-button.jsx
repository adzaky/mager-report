import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./button";

const SignOut = () => {
  return (
    <SignOutButton>
      <Button variant="destructive" className="px-6 font-bold">
        Sign Out
      </Button>
    </SignOutButton>
  );
};

export default SignOut;
