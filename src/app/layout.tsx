import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "~/app/_providers/posthog-provider";
import { shadcn } from "@clerk/themes";

export const metadata: Metadata = {
  title: "LPX DRIVE - Secure Cloud Storage",
  description:
    "Experience seamless cloud storage designed for you. Secure your files with LPX DRIVE.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <PostHogProvider>{children}</PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
