import Navbar from "@/components/navbar";
import "./globals.css";

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
      </body>
    </html>
  );
}
