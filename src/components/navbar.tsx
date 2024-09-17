import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Bird } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountNav from "./userAccountNav";
// import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  // const router = useRouter();
  // if (session?.user) {
  //   router.refresh();
  // }
  return (
    <div className=" bg-green-500 p-2 border-indigo-950 border-b  fixed w-full z-10 top-0">
      <div className=" container justify-between flex px-4 items-center">
        <Link href="/">
          <Bird />
        </Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            SignIn
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
