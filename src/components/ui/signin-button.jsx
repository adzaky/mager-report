import { SignInButton } from "@clerk/nextjs";
import { Button } from "./button";

const SignIn = () => {
  return (
    <SignInButton>
      <Button variant="destructive" className="w-full px-6 font-bold">
        Sign In
      </Button>
    </SignInButton>
  );
};

export default SignIn;
