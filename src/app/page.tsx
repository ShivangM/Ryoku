import Board from '@/components/Board';
import Suggestions from '@/components/Suggestions';

export default function Home() {
  return (
    <main className="px-4 md:px-6 space-y-4 pt-4 pb-20">
      <Suggestions />
      <Board />
    </main>
  );
}
