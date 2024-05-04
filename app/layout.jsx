import localFont from 'next/font/local'
import "./globals.css";

const notosans = localFont({ src: './fonts/NotoSans.woff2' })

export const metadata = {
  title: "Next-Azure-App",
  description: "Next.js app with Azure integration",  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={notosans.className}>{children}</body>
    </html>
  );
}
