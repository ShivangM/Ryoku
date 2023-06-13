'use client';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

type Inputs = {
  email: string;
  password: string;
  remberMe: boolean;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [setSession] = useAuthStore((state) => [state.setSession]);

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (errors.email) {
      toast.error('Please enter a valid email address');
      return;
    } else if (errors.password) {
      toast.error('Please enter a valid password');
      return;
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.error) {
      toast.error(res.error);
      return;
    }

    console.log(res);
    setSession(res.session);
    toast.success('Logged in successfully');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-white"
        >
          Your email
        </label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="bg-dark text-white sm:text-sm rounded-lg block w-full p-2.5"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-white"
        >
          Password
        </label>
        <input
          type="password"
          {...register('password', { required: true, minLength: 8 })}
          placeholder="••••••••"
          className="bg-dark text-white sm:text-sm rounded-lg block w-full p-2.5"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4"
              {...register('remberMe')}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="text-white">
              Remember me
            </label>
          </div>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-primary-600 hover:underline text-cyan-500"
        >
          Forgot password?
        </Link>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full disabled:animate-pulse text-white bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Sign in
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don&apos;t have an account yet?{' '}
        <Link
          href="/signup"
          className="font-medium text-cyan-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
