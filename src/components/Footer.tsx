import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="w-full px-4 py-8 bg-black text-center">
      <p className="text-white text-sm font-light">
        Made with ❤️ by{' '}
        <Link
          href="https://www.shivangmishra.tech/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium underline"
        >
          Shivang Mishra
        </Link>
      </p>
    </div>
  );
};

export default Footer;
