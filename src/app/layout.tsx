// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "Fullstack Developer Portfolio",
//   description: "A Next.js and TypeScript project.",
// };

// export default function RootLayout({ children }: LayoutProps<"/">) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Munavvar — Full Stack Developer",
  description:
    "Full Stack Developer specialising in Node.js, TypeScript, NestJS, React and distributed systems.",
  openGraph: {
    title: "Munavvar — Full Stack Developer",
    description:
      "Full Stack Developer specialising in Node.js, TypeScript, NestJS, React and distributed systems.",
    url: "https://ssssss-stack-ecru.vercel.app",
    siteName: "Munavvar",
    images: [
      {
        url: "https://munavarkfull-stack-ecru.vercel.app/og-image.png",
        width: 1200,
        height: 627,
        alt: "Munavvar — Full Stack Developer",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}