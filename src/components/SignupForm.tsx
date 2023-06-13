'use client';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (errors.email) {
      toast.error('Please enter a valid email address');
      return;
    } else if (errors.password) {
      toast.error('Please enter a valid password');
      return;
    } else if (errors.name) {
      toast.error('Please enter a valid name');
      return;
    } else if (errors.confirmPassword) {
      toast.error('Please confirm your password');
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.message) {
      toast.success(res.message);
      reset();
    } else {
      toast.error(res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-white"
        >
          Your name
        </label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="bg-dark text-white sm:text-sm rounded-lg block w-full p-2.5"
          placeholder="Jhon Doe"
          required
        />
      </div>
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
          placeholder="jhondoe123@gmail.com"
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
      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-white"
        >
          Confirm Password
        </label>
        <input
          type="password"
          {...register('confirmPassword', { required: true, minLength: 8 })}
          placeholder="••••••••"
          className="bg-dark text-white sm:text-sm rounded-lg block w-full p-2.5"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-white bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:animate-pulse disabled:cursor-not-allowed"
      >
        Sign up
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-cyan-500 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
