import Image from 'next/image';
import Link from 'next/link';
import Search from './Search';

const Header = () => {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-dark/60 space-y-8 md:space-y-0">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-secondary to-primary rounded-md filter blur-3xl opacity-60 -z-50"></div>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Ryoku Logo"
            width={300}
            height={100}
            className="w-44 md:w-56 object-contain"
          />
        </Link>

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <Search />

          <div className="hidden md:block p-2 rounded-full bg-blue-600 text-white font-semibold w-fit text-2xl">
            SM
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
