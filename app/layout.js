import "./globals.css";
import { Providers } from "./providers";

const isProd = process.env.NODE_ENV === "production";

export const metadata = {
  title: "Crosswit",
  description: "Word Search & Memory Trainer",
  icons: {
    icon: isProd ? "/favicon.ico" : "/favicon-dev.ico",
  },
};

export default async function RootLayout({ children, params, searchParams }) {
  // Next.js 15+: params and searchParams are Promises; await so they are not enumerated as Promises
  await params;
  await searchParams;
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Righteous&family=Caveat&family=Roboto&family=Merriweather&family=Ubuntu:wght@400;700&family=Ubuntu+Mono&family=Source+Code+Pro&family=Titillium+Web&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=Fira+Code:wght@300..700&family=Rubik+Doodle+Shadow&family=Rampart+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink">
        <Providers>{children}</Providers>
        <div id="overlays" />
      </body>
    </html>
  );
}
