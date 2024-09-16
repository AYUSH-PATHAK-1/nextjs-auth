import { FC, ReactNode } from "react";
import { Button } from "./ui/button";

interface GoogleSigninProps {
  children: ReactNode;
}

const SigninwithGoogle: FC<GoogleSigninProps> = ({ children }) => {
  const loginwithgoogle = () => {
    console.log("login with google");
  };
  return (
    <Button onClick={loginwithgoogle} className="w-full">
      {children}
    </Button>
  );
};

export default SigninwithGoogle;
