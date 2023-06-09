'use client';
import { useBoardStore } from '@/store/boardStore';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from './Column';

const Board = () => {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    //Col Drag
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({ ...board, columns: rearrangedColumns });
    }

    //Card Drag
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newColumn = {
        ...startCol,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(newColumn.id, newColumn);
      setBoardState({ ...board, columns: newColumns });
      return;
    } else {
      const newStartTodos = startCol.todos;
      const newFinishTodos = finishCol.todos;
      newFinishTodos.splice(destination.index, 0, todoMoved);
      const newStartColumn = {
        ...startCol,
        todos: newStartTodos,
      };
      const newFinishColumn = {
        ...finishCol,
        todos: newFinishTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(newStartColumn.id, newStartColumn);
      newColumns.set(newFinishColumn.id, newFinishColumn);

      updateTodoInDB(todoMoved, newFinishColumn.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 gap-10 lg:gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
