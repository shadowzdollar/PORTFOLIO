import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Igiraneza Joseph — Backend & AI/ML Engineer',
  description:
    'Portfolio of Igiraneza Joseph, a backend and AI/ML engineer building systems that think, scale, and endure.',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
