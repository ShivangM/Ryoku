'use client';

import { useBoardStore } from '@/store/boardStore';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Search = () => {
  const [setSearchString] = useBoardStore((state) => [state.setSearchString]);

  return (
    <form className="flex items-center space-x-5 bg-dark rounded-md p-2 shadow-md flex-1 md:flex-initial">
      <MagnifyingGlassIcon className="h-6 w-6 text-primary" />
      <input
        type="text"
        className="flex-1 outline-none p-2 bg-dark text-primary"
        placeholder="Search"
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button type="submit" hidden>
        Hidden Search
      </button>
    </form>
  );
};

export default Search;
