import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Budget Tracker',
  description: 'A tracker for your budget',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <section className="min-h-screen bg-gray-100">{children}</section>
      </body>
    </html>
  );
}
