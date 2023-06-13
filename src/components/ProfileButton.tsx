'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProfileButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [removeSession] = useAuthStore((state) => [state.removeSession]);
  const router = useRouter();
  const [session] = useAuthStore((state) => [state.session]);

  const handleLogout = () => {
    removeSession();
    router.push('/login');
  };

  return (
    <div hidden={!session} className="relative">
      <button
        type="button"
        onClick={() => setShowOptions(!showOptions)}
        className="hidden md:block p-2 rounded-full bg-blue-600 text-white font-semibold w-fit text-2xl"
      >
        SM
      </button>

      {showOptions && (
        <div className="bg-dark bg-opacity-80 p-4 rounded-md text-white absolute flex flex-col -translate-x-full whitespace-nowrap top-10 w-40 text-center space-y-2">
          <Link className="bg-white/5 px-4 py-2" href="/profile">
            My Profile
          </Link>
          <button className="bg-white/5 px-4 py-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
