const formatTodosForOpenAI = (board: Board) => {
  const todos = Array.from(board.columns.entries());

  const floatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in TypedColumn]: Todo[] });

  const floatArrayCounted = Object.entries(floatArray).reduce(
    (map, [key, value]) => {
      map[key as TypedColumn] = value.length;
      return map;
    },
    {} as { [key in TypedColumn]: number }
  );

  return floatArrayCounted;
};

export default formatTodosForOpenAI;
