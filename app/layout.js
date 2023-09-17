import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import { redirect } from 'next/navigation';

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
        <section className="bg-slate-200">{children}</section>
      </body>
    </html>
  );
}
