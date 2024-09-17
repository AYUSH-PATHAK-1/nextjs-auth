import Navbar from "@/components/navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className=" h-screen flex flex-col justify-center items-center">
          <Navbar />
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
