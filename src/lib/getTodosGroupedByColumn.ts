import { database } from '@/utils/appwrite';

export const getTodosGroupedByColumn = async () => {
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      title: todo.title,
      $createdAt: todo.$createdAt,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  const columnType: TypedColumn[] = ['todo', 'inprogress', 'done'];
  for (const type of columnType) {
    if (!columns.get(type)) {
      columns.set(type, {
        id: type,
        todos: [],
      });
    }
  }

  const sortedColumns = new Map<TypedColumn, Column>(
    Array.from(columns.entries()).sort(
      (a, b) => columnType.indexOf(a[0]) - columnType.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
