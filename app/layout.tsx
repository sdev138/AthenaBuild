import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Athena - AI-Powered Personalized Tutor",
  openGraph: {
    title: "Athena - AI-Powered Personalized Tutor",
    description:
      "Athena is a personalized tutor that will guarantee that you ace your next test!",
    images: [
      {
        url: "https://demo.useliftoff.com/opengraph-image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Athena - AI Powered Problem Generator",
    description:
      "Athena is a personalized tutor that will guarantee that you ace your next test!",
    images: ["https://demo.useliftoff.com/opengraph-image"],
    creator: "@tmeyer_me",
  },
  metadataBase: new URL("https://demo.useliftoff.com"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        {children}
      </body>
    </html>
  );
}
