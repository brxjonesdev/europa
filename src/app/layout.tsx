import type { Metadata } from 'next';
import { Geist, Geist_Mono, Epilogue } from 'next/font/google';
import './globals.css';
import EuropaNavbar from '@/features/navbar/components/navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const epilogue = Epilogue({
  variable: '--font-epilogue',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Europa',
  description: 'Europa helps users learn ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${epilogue.variable} antialiased font-epilogue h-dvh flex flex-col`}
      >
        <EuropaNavbar />
        {children}
      </body>
    </html>
  );
}
