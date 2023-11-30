import "./globals.css";
import { Public_Sans } from "next/font/google";

import { Navbar } from "@/components/Navbar";

const publicSans = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Cav&apos;s Course Recommender</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta
          name="description"
          content="Recommender project for CSCE 470 at Texas A&M University to recommend upper-level CSCE electives"
        />
        <meta property="og:title" content="Cav&apos;s Course Recommender" />
        <meta
          property="og:description"
          content="Recommender project for CSCE 470 at Texas A&M University to recommend upper-level CSCE electives"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cav&apos;s Course Recommender" />
        <meta
          name="twitter:description"
          content="Recommender project for CSCE 470 at Texas A&M University to recommend upper-level CSCE electives"
        />
      </head>
      <body className={publicSans.className}>
        <div className="flex flex-col p-4 md:p-12 h-[100vh]">
          <Navbar></Navbar>
          {children}
        </div>
      </body>
    </html>
  );
}
