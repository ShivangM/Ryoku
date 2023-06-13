import SignupForm from '@/components/SignupForm';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ryoku | Signup',
  openGraph: {
    title: 'Ryoku | Signup',
  },
};

const SignupPage = () => {
  return (
    <section className="bg-dark">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <Image
            height={100}
            width={300}
            className=""
            src="/logo.svg"
            alt="Ryoku Logo"
          />
        </Link>
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-white/5 border-primary">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Register your account
            </h1>

            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
