import './globals.css';
import { Roboto } from 'next/font/google';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Ryoku | Your Personal Task Keeper',
  description: `Ryoku is the ultimate task management app designed to empower your productivity. With its sleek design and powerful features, Ryoku keeps you in control of your tasks, effortlessly.

  Efficiency is at the core of Ryoku. The app's intuitive interface features three columns: Todo, Done, and InProgress. Stay organized as you manage your tasks, seamlessly moving them between columns with a simple swipe.

  But Ryoku goes beyond traditional task management. Powered by advanced AI, Ryoku leverages GPT technology to generate intelligent task summaries. Gain valuable insights and personalized recommendations, optimizing your workflow like never before.`,
  authors: [{ name: 'Shivang Mishra', url: 'https://www.shivangmishra.tech/' }],
  creator: 'Shivang Mishra',
  category: 'Productivity, Task Management, AI',
  keywords: [
    'Ryoku',
    'Task Management',
    'Productivity',
    'AI',
    'GPT',
    'GPT-3',
    'Manage Tasks',
  ],
  applicationName: 'Ryoku',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ryoku.vercel.app',
    siteName: 'Ryoku',
    images: [],
    description:
      'Ryoku is the ultimate task management app designed to empower your productivity. With its sleek design and powerful features, Ryoku keeps you in control of your tasks, effortlessly.',
    title: 'Ryoku | Your Personal Task Keeper',
    countryName: 'India',
    emails: ['shivangmishra0824@gmail.com'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={roboto.style}
        className="bg-dark scrollbar-thin scrollbar-track-dark scrollbar-thumb-primary"
      >
        <Header />
        {children}
        <Modal />
        <Footer />
      </body>
    </html>
  );
}
