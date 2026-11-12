import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "SHAKIL STORE | Shop Better, Live Better",
  description: "Discover everyday essentials, gadgets, home and lifestyle products at SHAKIL STORE. Shop online across Bangladesh.",
  metadataBase: new URL("https://shakil-store.onrender.com"),
  openGraph: { title: "SHAKIL STORE", description: "Premium everyday shopping across Bangladesh.", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
