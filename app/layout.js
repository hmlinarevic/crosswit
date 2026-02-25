import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Crosswit",
  description: "Word Search & Memory Trainer",
  icons: { icon: "https://millify.dev/favicon.ico" },
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
      </head>
      <body>
        <Providers>{children}</Providers>
        <div id="overlays" />
      </body>
    </html>
  );
}
