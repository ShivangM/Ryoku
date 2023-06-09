import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { database, ID, storage } from '@/utils/appwrite';
import { create } from 'zustand';

interface BoardState {
  board: Board;
  searchString: string;
  newTaskInput: string;
  newTaskType: TypedColumn;
  image: File | null;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  setSearchString: (searchString: string) => void;
  addTodo: (todo: string, columnId: TypedColumn, image?: File | null) => void;
  deleteTodo: (todoIndex: number, todo: Todo, id: TypedColumn) => void;
  setNewTaskInput: (input: string) => void;
  setNewTaskType: (type: TypedColumn) => void;
  setImage: (image: File | null) => void;
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: '',
  newTaskInput: '',
  newTaskType: 'todo',
  image: null,

  setSearchString: (searchString) => set({ searchString }),

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },

  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  setNewTaskType: (type: TypedColumn) => set({ newTaskType: type }),
  setImage: (image) => set({ image }),

  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  addTodo: async (todo, columnId, image?) => {
    let file: Image | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set({ newTaskInput: '' });

    set((state) => {
      const newColumns = new Map<TypedColumn, Column>(state.board.columns);
      const newTodo: Todo = {
        $id,
        title: todo,
        status: columnId,
        $createdAt: new Date().toISOString(),
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, { id: columnId, todos: [newTodo] });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },

  deleteTodo: async (todoIndex, todo, id) => {
    const newColumns = new Map<TypedColumn, Column>(get().board.columns);

    newColumns.get(id)?.todos.splice(todoIndex, 1);
    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },
}));
