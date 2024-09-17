import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const UserSchema = z.object({
  username: z.string().min(1, "Username is required").max(30),
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = UserSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User With this email alredy exisits",
        },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "This Username alredy exisits",
        },
        { status: 409 }
      );
    }

    const hashPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPasswrd, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User Created Successfully !",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something Error happend",
        error,
      },
      { status: 500 }
    );
  }
}
