import formatTodosForOpenAI from './formatTodosForOpenAI';

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForOpenAI(board);

  const response = await fetch('/api/generateSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todos }),
  });

  if (response.status !== 200)
    return 'Sorry, GPT was unable to generate a summary!';

  const data = await response.json();
  const { content } = data;

  return content;
};

export default fetchSuggestion;
