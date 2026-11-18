import type { Metadata, Viewport } from "next";
import { Toaster } from 'react-hot-toast';
import { Nunito } from "next/font/google";
import { StoreProvider } from "./StoreProvider";
import { SessionToast } from "@/components/auth/SessionToast";
import { Suspense } from "react";
import "./globals.css";


const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "Client White is a CRM and helpdesk that brings customers, leads, support tickets, invoices, email and team chat into one workspace.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Client White | CRM and helpdesk", template: "%s | Client White" },
  description,
  applicationName: "Client White",
  authors: [{ name: "Ali Durul", url: "https://alidurul.dev" }],
  keywords: ["CRM", "helpdesk", "customer management", "lead tracking", "support tickets", "invoicing", "Next.js"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Client White",
    title: "Client White | CRM and helpdesk",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client White | CRM and helpdesk",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#4361ee",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="apple-mobile-web-app-title" content="Client White" />
      </head>

      <StoreProvider>
        <body className={`${nunito.variable} font-nunito`}>
          {children}
          <Suspense >
            <SessionToast />
            <Toaster />
          </Suspense>
        </body>
      </StoreProvider>
    </html>
  );
}
