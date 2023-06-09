'use client';
import fetchSuggestion from '@/lib/fetchSuggestion';
import { useBoardStore } from '@/store/boardStore';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

const Suggestions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>('');
  const [board] = useBoardStore((state) => [state.board]);

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  return (
    <div className="flex items-center justify-center px-5 py-2 md:py-5">
      <p className="space-x-1 flex items-center text-sm font-light shadow-xl rounded-xl w-fit bg-dark/80 shadow-md italic p-5 max-w-3xl text-primary">
        <UserCircleIcon
          className={classNames(
            'inline-block h-10 w-10 text-primary',
            loading && 'animate-spin'
          )}
        />
        <span>
          {suggestion && !loading ? suggestion : 'Fetching suggestion...'}
        </span>
      </p>
    </div>
  );
};

export default Suggestions;
