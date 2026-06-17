import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://k-scoop.example.com";
const SITE_NAME = "K-Scoop";
const SITE_TITLE = "K-Scoop — Korean Showbiz News, Gossip & Upcoming K-Dramas";
const SITE_DESCRIPTION =
  "Daily Korean showbiz news — celebrity gossip, trending actor & actress updates, and upcoming K-drama releases across Netflix, Disney+, and Prime Video. Updated every morning.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | K-Scoop`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js 16",
  keywords: [
    "Korean showbiz",
    "Korean celebrity news",
    "K-drama",
    "Korean drama 2026",
    "Korean celebrity gossip",
    "Korean actors",
    "Korean actresses",
    "upcoming K-dramas",
    "Netflix K-drama",
    "Disney+ K-drama",
    "Kim Soo-hyun",
    "Suzy",
    "IU",
    "Byeon Woo-seok",
    "Kim Seon-ho",
    "Hong Yi-seol",
    "Ju Ji-hoon",
    "Park Bo-young",
    "Delusion K-drama",
    "Perfect Crown",
    "My Royal Nemesis",
  ],
  authors: [{ name: "K-Scoop Editorial", url: SITE_URL }],
  creator: "K-Scoop",
  publisher: "K-Scoop",
  category: "entertainment",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "K-Scoop — Korean Showbiz News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@kscoop",
    site: "@kscoop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: "/manifest.json",
  // verification: {
  //   google: "your-google-search-console-verification-code",
  //   other: { "cloudflare-verify": "your-cf-token" },
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
