"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import SigninwithGoogle from "../SigninwithGoogle";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SigninForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    // console.log(signInData);
    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Oops! Something Went Wrong !",
        variant: "destructive",
      });
    } else {
      console.log("Sign-in successful");
      toast({
        title: "LogedIn Successfully",
        description: "Nice !",
        variant: "success",
      });
      // router.refresh();
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className=" space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Email" {...field} />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className=" w-full mt-6" type="submit">
          SignIn
        </Button>
      </form>
      <div className=" mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <SigninwithGoogle>SignIn With Google</SigninwithGoogle>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className=" text-blue-500 hover:underline" href="/sign-up">
          SignUp
        </Link>
      </p>
    </Form>
  );
};

export default SigninForm;
