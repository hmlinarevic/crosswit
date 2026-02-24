import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Crosswit",
  description: "Word Search & Memory Trainer",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
