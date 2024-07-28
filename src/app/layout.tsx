import localFont from 'next/font/local';
import './globals.css';

const gotham = localFont({
  variable: '--gotham',
  src: [
    {
      path: '../assets/fonts/Gotham-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Gotham-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={gotham.variable}>{children}</body>
    </html>
  );
}
